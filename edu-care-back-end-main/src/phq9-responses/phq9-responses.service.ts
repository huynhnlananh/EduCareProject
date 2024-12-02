import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePhq9ResponseDto } from './dto/create-phq9-response.dto'
import { UpdatePhq9ResponseDto } from './dto/update-phq9-response.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PHQ9Responses } from '@/phq9-responses/entities/phq9-response.entity'
import { EntityManager, Repository } from 'typeorm'
import { PHQ9Questions } from '@/phq9-questions/entities/phq9-question.entity'
import { UsersService } from '@/users/users.service'
import { SurveysService } from '@/surveys/surveys.service'

@Injectable()
export class Phq9ResponsesService {
  constructor(
    @InjectRepository(PHQ9Responses)
    private readonly phq9ResponsesRepository: Repository<PHQ9Responses>,

    @InjectRepository(PHQ9Questions)
    private readonly phq9QuestionsRepository: Repository<PHQ9Questions>,

    private readonly usersService: UsersService,
    private readonly surveysService: SurveysService,
  ) {}

  async saveMultipleAnswers(createPHQ9ResponsesDto: CreatePhq9ResponseDto): Promise<void> {
    const { userId, surveyId, answers } = createPHQ9ResponsesDto
    const user = await this.usersService.findOne(userId)
    const survey = await this.surveysService.findOne(surveyId)

    // Kiểm tra xem các câu hỏi có hợp lệ không
    const questionIds = answers.map((answer) => answer.questionId)
    const questions = await this.phq9QuestionsRepository.findByIds(questionIds)
    if (questions.length !== answers.length) {
      throw new BadRequestException('Some questions are invalid')
    }
   
    await this.phq9ResponsesRepository.manager.transaction(async (manager: EntityManager) => {
      await Promise.all(
        answers.map(async (answer) => {
          const question = questions.find((q) => q.id === answer.questionId)
          if (!question) {
            throw new Error(`Question with ID ${answer.questionId} not found`)
          }
          const response = new PHQ9Responses()
          response.user = user
          response.survey = survey
          response.question = question
          response.answerValue = answer.answerValue

          // Lưu câu trả lời vào DB trong transaction
          await manager.save(PHQ9Responses, response)
        })
      )
    })
  }

  create(createPhq9ResponseDto: CreatePhq9ResponseDto) {
    return 'This action adds a new phq9Response'
  }

  findAll() {
    return `This action returns all phq9Responses`
  }

  findOne(id: number) {
    return `This action returns a #${id} phq9Response`
  }

  update(id: number, updatePhq9ResponseDto: UpdatePhq9ResponseDto) {
    return `This action updates a #${id} phq9Response`
  }

  remove(id: number) {
    return `This action removes a #${id} phq9Response`
  }
}
