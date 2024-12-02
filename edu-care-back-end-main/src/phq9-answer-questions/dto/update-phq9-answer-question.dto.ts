import { PartialType } from '@nestjs/mapped-types';
import { CreatePhq9AnswerQuestionDto } from './create-phq9-answer-question.dto';

export class UpdatePhq9AnswerQuestionDto extends PartialType(CreatePhq9AnswerQuestionDto) {}
