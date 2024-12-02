import { Module } from '@nestjs/common';
import { Phq9AnswerQuestionsService } from './phq9-answer-questions.service';
import { Phq9AnswerQuestionsController } from './phq9-answer-questions.controller';

@Module({
  controllers: [Phq9AnswerQuestionsController],
  providers: [Phq9AnswerQuestionsService],
})
export class Phq9AnswerQuestionsModule {}
