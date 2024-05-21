import { PartialType } from '@nestjs/swagger';
import { CreatePaytyDto } from './create-payty.dto';

export class UpdatePaytyDto extends PartialType(CreatePaytyDto) {}
