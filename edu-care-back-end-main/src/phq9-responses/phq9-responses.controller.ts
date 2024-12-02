import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { Phq9ResponsesService } from './phq9-responses.service'
import { CreatePhq9ResponseDto } from './dto/create-phq9-response.dto'
import { UpdatePhq9ResponseDto } from './dto/update-phq9-response.dto'
import { BaseResponse } from '@/shared/res/base-response'

@Controller('phq9-responses')
export class Phq9ResponsesController {
  constructor(private readonly phq9ResponsesService: Phq9ResponsesService) {}

  @Post()
  async createMultipleResponse(@Body() createPhq9ResponseDto: CreatePhq9ResponseDto): Promise<BaseResponse<null>> {
    await this.phq9ResponsesService.saveMultipleAnswers(createPhq9ResponseDto)
    return new BaseResponse<null>(
      `Create multiple response for surveyId:${createPhq9ResponseDto.surveyId} successfully`
    )
  }

  @Get()
  findAll() {
    return this.phq9ResponsesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phq9ResponsesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhq9ResponseDto: UpdatePhq9ResponseDto) {
    return this.phq9ResponsesService.update(+id, updatePhq9ResponseDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phq9ResponsesService.remove(+id)
  }
}
