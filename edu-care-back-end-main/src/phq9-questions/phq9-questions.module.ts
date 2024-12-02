import { Module } from '@nestjs/common'
import { Phq9QuestionsService } from './phq9-questions.service'
import { Phq9QuestionsController } from './phq9-questions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PHQ9Questions } from './entities/phq9-question.entity'
import { PHQ9AnswerQuestions } from '@/phq9-answer-questions/entities/phq9-answer-question.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PHQ9Questions, PHQ9AnswerQuestions])],
  controllers: [Phq9QuestionsController],
  providers: [Phq9QuestionsService],
  exports: [Phq9QuestionsService]
})
export class Phq9QuestionsModule {}
