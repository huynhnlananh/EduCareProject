import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { Phq9QuestionsModule } from './phq9-questions/phq9-questions.module'
import { SurveysModule } from './surveys/surveys.module'
import { Phq9ResponsesModule } from './phq9-responses/phq9-responses.module'
import { SuggestionsModule } from './suggestions/suggestions.module'
import { Phq9AnswerQuestionsModule } from './phq9-answer-questions/phq9-answer-questions.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from '@/config/database.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    Phq9QuestionsModule,
    SurveysModule,
    Phq9ResponsesModule,
    SuggestionsModule,
    Phq9AnswerQuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
