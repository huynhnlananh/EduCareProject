import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { Phq9QuestionsService } from './phq9-questions.service'
import { CreatePhq9QuestionDto } from './dto/create-phq9-question.dto'
import { UpdatePhq9QuestionDto } from './dto/update-phq9-question.dto'
import { BaseResponse } from '@/shared/res/base-response'
import { IGetRandomQuestionResponse } from './phq9-questions.i'

@Controller('phq9-questions')
export class Phq9QuestionsController {
  constructor(private readonly phq9QuestionsService: Phq9QuestionsService) {}

  @Post()
  create(@Body() createPhq9QuestionDto: CreatePhq9QuestionDto) {
    return this.phq9QuestionsService.create(createPhq9QuestionDto)
  }

  @Get()
  findAll() {
    return this.phq9QuestionsService.findAll()
  }

  @Get('random')
  async getRandomQuestions(): Promise<BaseResponse<IGetRandomQuestionResponse[]>> {
    const questions = await this.phq9QuestionsService.getRandomQuestions()
    return new BaseResponse<IGetRandomQuestionResponse[]>('Get random 9 questions successfully', questions)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phq9QuestionsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhq9QuestionDto: UpdatePhq9QuestionDto) {
    return this.phq9QuestionsService.update(+id, updatePhq9QuestionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phq9QuestionsService.remove(+id)
  }
}
