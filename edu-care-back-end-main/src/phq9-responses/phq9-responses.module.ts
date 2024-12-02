import { Module } from '@nestjs/common'
import { Phq9ResponsesService } from './phq9-responses.service'
import { Phq9ResponsesController } from './phq9-responses.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PHQ9Responses } from './entities/phq9-response.entity'
import { PHQ9Questions } from '@/phq9-questions/entities/phq9-question.entity'
import { UsersModule } from '@/users/users.module'
import { SurveysModule } from '@/surveys/surveys.module'

@Module({
  imports: [TypeOrmModule.forFeature([PHQ9Responses, PHQ9Questions]), UsersModule, SurveysModule],
  controllers: [Phq9ResponsesController],
  providers: [Phq9ResponsesService]
})
export class Phq9ResponsesModule {}
