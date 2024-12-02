import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePhq9QuestionDto } from './dto/create-phq9-question.dto'
import { UpdatePhq9QuestionDto } from './dto/update-phq9-question.dto'
import { PHQ9Questions } from './entities/phq9-question.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PHQ9AnswerQuestions } from '@/phq9-answer-questions/entities/phq9-answer-question.entity'
import { IGetRandomQuestionResponse } from './phq9-questions.i'

@Injectable()
export class Phq9QuestionsService {
  constructor(
    @InjectRepository(PHQ9Questions)
    private readonly questionsRepository: Repository<PHQ9Questions>,
    @InjectRepository(PHQ9AnswerQuestions)
    private readonly answerQuestionRepository: Repository<PHQ9AnswerQuestions>
  ) {}

  create(createPhq9QuestionDto: CreatePhq9QuestionDto) {
    return 'This action adds a new phq9Question'
  }

  findAll() {
    return `This action returns all phq9Questions`
  }

  async getRandomQuestions(): Promise<IGetRandomQuestionResponse[]> {
    // Lấy 9 câu hỏi ngẫu nhiên
    const questions = await this.questionsRepository
      .createQueryBuilder('question')
      .select(['question.id', 'question.questionText'])
      .orderBy('RAND()')
      .limit(9)
      .getMany()

    // Duyệt qua mỗi câu hỏi để lấy câu trả lời từ bảng PHQ9AnswerQuestions
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Lấy tất cả câu trả lời của mỗi câu hỏi từ answerQuestionRepository
        const answers = await this.answerQuestionRepository.find({
          where: { question: { id: question.id } }
        })

        return {
          id: question.id,
          questionText: question.questionText,
          answers: answers.map((answer) => {
            const { id, answerOption, answerText, score } = answer
            return { id, answerOption, answerText, score }
          })
        }
      })
    )

    return questionsWithAnswers
  }

  async findOne(id: number) {
    const question = await this.questionsRepository.findOne({
      where: { id }
    })
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`)
    }
    return question
  }

  update(id: number, updatePhq9QuestionDto: UpdatePhq9QuestionDto) {
    return `This action updates a #${id} phq9Question`
  }

  remove(id: number) {
    return `This action removes a #${id} phq9Question`
  }
}
