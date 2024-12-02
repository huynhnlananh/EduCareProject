import { PartialType } from '@nestjs/mapped-types';
import { CreatePhq9ResponseDto } from './create-phq9-response.dto';

export class UpdatePhq9ResponseDto extends PartialType(CreatePhq9ResponseDto) {}
