import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSurveyDto } from './dto/create-survey.dto'
import { UpdateSurveyDto } from './dto/update-survey.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Surveys } from '@/surveys/entities/survey.entity'
import { Repository } from 'typeorm'
import { ICreateSurveyResponse } from '@/surveys/surveys.i'
import { UsersService } from '@/users/users.service'

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Surveys)
    private readonly surveysRepository: Repository<Surveys>,
    private readonly usersService: UsersService
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<ICreateSurveyResponse> {
    const user = await this.usersService.findOne(createSurveyDto.userId)
    const newSurvey: Partial<Surveys> = {
      user,
      totalScore: createSurveyDto.totalScore,
      depressionLevel: createSurveyDto.depressionLevel,
      createdBy: createSurveyDto.userId
    }
    const survey = this.surveysRepository.create(newSurvey)
    try {
      const result = await this.surveysRepository.save(survey)
      return { surveyId: result.id }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  findAll() {
    return `This action returns all surveys`
  }

  async findOne(id: number) {
    const survey = await this.surveysRepository.findOne({
      where: { id }
    })
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`)
    }
    return survey
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`
  }

  remove(id: number) {
    return `This action removes a #${id} survey`
  }
}
