import { DepressionLevel } from '@/surveys/enum/surveys.enum'
import { IsEnum, IsInt, IsPositive } from 'class-validator'

export class CreateSurveyDto {
  @IsInt()
  @IsPositive()
  userId: number

  @IsInt()
  @IsPositive()
  totalScore: number

  @IsEnum(DepressionLevel)
  depressionLevel: DepressionLevel
}
