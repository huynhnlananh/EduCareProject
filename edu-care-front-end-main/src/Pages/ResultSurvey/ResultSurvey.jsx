import React, { useEffect, useState } from "react";
import { getSuggestionByDepressionLevel } from "../../services/suggestions";
import { toast } from "react-toastify";

export const cardList = [
  {
    id: 1,
    img: "https://theme-land.com/sapp/demo/assets/img/content/thumb-6.png",
    title: "Chữa lành tâm hồn bằng âm nhạc - quên đi muộn phiền lắng lo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 2,
    img: "https://theme-land.com/sapp/demo/assets/img/content/thumb-6.png",
    title: "Chia sẻ câu chuyện và nghe tư vấn sức khỏe tâm lý với bác sĩ",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 3,
    img: "https://theme-land.com/sapp/demo/assets/img/content/thumb-6.png",
    title: "Lắng nghe và thấu hiểu mọi lúc mọi nơi",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

const DepressionLevel = {
  NoDepression: "no_depression",
  MildDepression: "mild_depression",
  ModerateDepression: "moderate_depression",
  SevereDepression: "severe_depression",
  VerySevereDepression: "very_severe_depression",
};

function evaluateAnxiety(depressionLevel: string): string {
  switch (depressionLevel) {
    case DepressionLevel.NoDepression:
      return "Đánh giá lo âu: Bạn không có dấu hiệu lo âu.";
    case DepressionLevel.MildDepression:
      return "Đánh giá lo âu: Bạn có dấu hiệu gặp lo âu nhẹ.";
    case DepressionLevel.ModerateDepression:
      return "Đánh giá lo âu: Bạn có dấu hiệu gặp lo âu vừa phải.";
    case DepressionLevel.SevereDepression:
      return "Đánh giá lo âu: Bạn có dấu hiệu gặp lo âu nghiêm trọng.";
    case DepressionLevel.VerySevereDepression:
      return "Đánh giá lo âu: Bạn có dấu hiệu gặp lo âu rất nghiêm trọng.";
    default:
      return "Đánh giá lo âu: Không xác định được mức độ trầm cảm.";
  }
}

const ReseultServey = () => {
  const [suggestions, setSuggestions] = useState();
  const [depressionLevel, setDepressionLevel] = useState(
    DepressionLevel.MildDepression
  ); // Mock dữ liệu, sau sẽ lấy dựa vào số điểm bài khảo sát
  const [score, setScore] = useState(8); // Mock dữ liệu, sau sẽ lấy dựa vào số điểm bài khảo sát

  useEffect(() => {
    fetchSuggestionByDepressionLevel();
  }, []);

  const fetchSuggestionByDepressionLevel = async () => {
    try {
      const response = await getSuggestionByDepressionLevel(depressionLevel);
      setSuggestions(response.suggestion);
    } catch (err) {
      toast.error("Lỗi khi lấy suggestion", {
        toastId: "not-found-suggestion",
      });
    }
  };

  return (
    <div className="bg-white">
      {/* section banner */}
      <div className="relative pt-8 container mx-auto">
        <h2 className="flex text-center max-w-[37.5rem] mx-auto justify-center uppercase text-2xl mb-2 font-bold text-blue-900">
          Cảm ơn bạn đã hoàn thành bài test
        </h2>
        <h2 className="flex text-center max-w-[37.5rem] mx-auto justify-center uppercase text-2xl mb-8 font-bold text-blue-900">
          Dưới đây là kết quả
        </h2>
        <div className="max-w-[37.5rem] mx-auto text-center bg-[#e5f1ff] shadow-xl rounded-xl p-4">
          <p className="text-blue-900 font-semibold">Điểm của bạn</p>
          <p className="my-4 text-blue-900 font-bold text-9xl">{score}</p>
          <p className="text-blue-900 text-sm">
            {evaluateAnxiety(depressionLevel)}
          </p>
        </div>
        <hr className="text-gray-600 my-4 " />
      </div>
      {/* section kham pha ngay */}
      <div className="relative container mx-auto mb-8">
        <p className="w-full text-sm text-center mb-8 px-20">{suggestions}</p>
        <p className="flex text-center max-w-[37.5rem] mx-auto justify-center uppercase text-2xl mb-8 font-bold text-blue-900">
          Khám phá ngay
        </p>
      </div>
      {/* section list card */}
      <div className="container mx-auto">
        <ul className="px-8">
          {cardList.map((item) => (
            <li
              key={item.id}
              className="flex items-center p-8 shadow-md rounded-xl justify-between my-6 mx-32 border cursor-pointer hover:shadow-lg hover:-translate-y-2 hover-lift duration-200"
            >
              <div className="flex items-center gap-4">
                <img
                  alt="logo"
                  width={150}
                  height={120}
                  src={item.img}
                  className="mr-4"
                />
                <div className="">
                  <p className="text-[16px] font-semibold pb-2 text-blue-900">
                    {item.title}
                  </p>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReseultServey;
