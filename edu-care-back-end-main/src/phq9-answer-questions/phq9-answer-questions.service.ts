import { Injectable } from '@nestjs/common';
import { CreatePhq9AnswerQuestionDto } from './dto/create-phq9-answer-question.dto';
import { UpdatePhq9AnswerQuestionDto } from './dto/update-phq9-answer-question.dto';

@Injectable()
export class Phq9AnswerQuestionsService {
  create(createPhq9AnswerQuestionDto: CreatePhq9AnswerQuestionDto) {
    return 'This action adds a new phq9AnswerQuestion';
  }

  findAll() {
    return `This action returns all phq9AnswerQuestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phq9AnswerQuestion`;
  }

  update(id: number, updatePhq9AnswerQuestionDto: UpdatePhq9AnswerQuestionDto) {
    return `This action updates a #${id} phq9AnswerQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} phq9AnswerQuestion`;
  }
}
