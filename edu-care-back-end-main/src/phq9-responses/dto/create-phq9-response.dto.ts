import { Type } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, Min } from 'class-validator'

export class CreatePhq9ResponseDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  userId: number

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  surveyId: number

  @IsArray()
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}
export class AnswerDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  questionId: number

  @IsInt()
  @IsNotEmpty()
  answerValue: number
}
