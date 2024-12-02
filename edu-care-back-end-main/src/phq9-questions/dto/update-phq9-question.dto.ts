import { PartialType } from '@nestjs/mapped-types';
import { CreatePhq9QuestionDto } from './create-phq9-question.dto';

export class UpdatePhq9QuestionDto extends PartialType(CreatePhq9QuestionDto) {}
