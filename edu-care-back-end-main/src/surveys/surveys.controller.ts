import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SurveysService } from './surveys.service'
import { CreateSurveyDto } from './dto/create-survey.dto'
import { UpdateSurveyDto } from './dto/update-survey.dto'
import { BaseResponse } from '@/shared/res/base-response'
import { ICreateSurveyResponse } from './surveys.i'

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  async create(@Body() createSurveyDto: CreateSurveyDto): Promise<BaseResponse<ICreateSurveyResponse>> {
    const result = await this.surveysService.create(createSurveyDto)
    return new BaseResponse<ICreateSurveyResponse>('Create survey successfully', result)
  }

  @Get()
  findAll() {
    return this.surveysService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(+id, updateSurveyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(+id)
  }
}
