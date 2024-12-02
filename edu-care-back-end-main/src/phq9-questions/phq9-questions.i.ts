import { AnswerOption } from '@/phq9-answer-questions/enum/phq9-answer-question.enum'

export interface IGetRandomQuestionResponse {
  id: number
  questionText: string
  answers: Array<{
    id: number
    answerOption: AnswerOption
    answerText: string
    score: number
  }>
}
