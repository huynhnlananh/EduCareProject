import { Module } from '@nestjs/common'
import { SurveysService } from './surveys.service'
import { SurveysController } from './surveys.controller'
import { Surveys } from '@/surveys/entities/survey.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Surveys])],
  controllers: [SurveysController],
  providers: [SurveysService],
  exports: [SurveysService]
})
export class SurveysModule {}
