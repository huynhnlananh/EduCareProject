import os
import json
import random
import logging
import pickle

import nltk
from nltk.stem import WordNetLemmatizer
from nltk import download as nltk_download

import numpy as np
from keras.models import load_model

from deep_translator import GoogleTranslator
from langdetect import detect, LangDetectException

# Tải xuống dữ liệu NLTK (chỉ cần thực hiện một lần)
nltk_download('punkt')
nltk_download('wordnet')

# Khởi tạo Lemmatizer
lemmatizer = WordNetLemmatizer()

# Đường dẫn đến các file cần thiết
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.getenv('MODEL_PATH', os.path.join(BASE_DIR, r'D:\Project\DjChatBox\ChatBotIntegration\BE\Chatbot_Project\File\Model.h5'))
INTENTS_PATH = os.getenv('INTENTS_PATH', os.path.join(BASE_DIR, r'D:\Project\DjChatBox\ChatBotIntegration\BE\Chatbot_Project\File\Intents.json'))
WORDS_PATH = os.getenv('WORDS_PATH', os.path.join(BASE_DIR, r'D:\Project\DjChatBox\ChatBotIntegration\BE\Chatbot_Project\File\Texts.pkl'))
CLASSES_PATH = os.getenv('CLASSES_PATH', os.path.join(BASE_DIR, r'D:\Project\DjChatBox\ChatBotIntegration\BE\Chatbot_Project\File\Labels.pkl'))

# Tải mô hình đã huấn luyện
try:
    model = load_model(MODEL_PATH)
    logging.info(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    logging.error(f"Failed to load model from {MODEL_PATH}: {e}")
    raise

# Tải các file dữ liệu intents, words, classes
try:
    with open(INTENTS_PATH, 'r', encoding='utf-8') as file:
        intents = json.load(file)
    logging.info(f"Intents loaded successfully from {INTENTS_PATH}")
except Exception as e:
    logging.error(f"Failed to load intents from {INTENTS_PATH}: {e}")
    raise

try:
    with open(WORDS_PATH, 'rb') as file:
        words = pickle.load(file)
    logging.info(f"Words loaded successfully from {WORDS_PATH}")
except Exception as e:
    logging.error(f"Failed to load words from {WORDS_PATH}: {e}")
    raise

try:
    with open(CLASSES_PATH, 'rb') as file:
        classes = pickle.load(file)
    logging.info(f"Classes loaded successfully from {CLASSES_PATH}")
except Exception as e:
    logging.error(f"Failed to load classes from {CLASSES_PATH}: {e}")
    raise

def clean_up_sentence(sentence):
    """
    Tokenize và lemmatize câu đầu vào.
    """
    sentence_words = nltk.word_tokenize(sentence.lower())
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    """
    Trả về mảng bag of words cho câu đầu vào.
    """
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    logging.debug(f"Found in bag: {w}")
    return np.array(bag)

def predict_class(sentence, model):
    """
    Dự đoán lớp của câu đầu vào bằng mô hình đã huấn luyện.
    """
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    # Lấy chỉ số có độ tin cậy cao nhất
    class_idx = np.argmax(res)
    predicted_class = classes[class_idx]
    confidence = res[class_idx]

    return predicted_class, confidence

def get_response(predicted_class, confidence, intents_json):
    """
    Lấy phản hồi dựa trên lớp dự đoán và độ tin cậy.
    """
    # Điều chỉnh phản hồi dựa trên mức độ tin cậy
    if confidence > 0.8:
        # Độ tin cậy cao, trả lời trực tiếp
        for intent in intents_json['intents']:
            if intent['tag'] == predicted_class:
                return random.choice(intent['responses'])
    elif confidence > 0.5:
        # Độ tin cậy trung bình, yêu cầu làm rõ
        for intent in intents_json['intents']:
            if intent['tag'] == predicted_class:
                base_response = random.choice(intent['responses'])
                return f"{base_response}\nCould you please clarify what you mean? I want to understand better."
    elif confidence > 0.3:
        # Độ tin cậy thấp, yêu cầu giải thích khác
        for intent in intents_json['intents']:
            if intent['tag'] == predicted_class:
                base_response = random.choice(intent['responses'])
                return f"{base_response}\nI am not sure I understand. Can you try explaining it differently?"
    else:
        # Độ tin cậy rất thấp, không hiểu
        return "Sorry, I don't understand you well enough. Could you rephrase?"

def chatbot_response(msg):
    try:
        predicted_class, confidence = predict_class(msg, model)
        response = get_response(predicted_class, confidence, intents)
        logging.info(f"Bot response: {response}")
        return predicted_class, confidence, response
    except Exception as e:
        logging.error(f"Error in chatbot_response: {e}")
        return "Error", 0.0, "Sorry, there was an error processing your request."
