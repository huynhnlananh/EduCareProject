import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Phq9AnswerQuestionsService } from './phq9-answer-questions.service';
import { CreatePhq9AnswerQuestionDto } from './dto/create-phq9-answer-question.dto';
import { UpdatePhq9AnswerQuestionDto } from './dto/update-phq9-answer-question.dto';

@Controller('phq9-answer-questions')
export class Phq9AnswerQuestionsController {
  constructor(private readonly phq9AnswerQuestionsService: Phq9AnswerQuestionsService) {}

  @Post()
  create(@Body() createPhq9AnswerQuestionDto: CreatePhq9AnswerQuestionDto) {
    return this.phq9AnswerQuestionsService.create(createPhq9AnswerQuestionDto);
  }

  @Get()
  findAll() {
    return this.phq9AnswerQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phq9AnswerQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhq9AnswerQuestionDto: UpdatePhq9AnswerQuestionDto) {
    return this.phq9AnswerQuestionsService.update(+id, updatePhq9AnswerQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phq9AnswerQuestionsService.remove(+id);
  }
}
