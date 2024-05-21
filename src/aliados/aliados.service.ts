import { Injectable } from '@nestjs/common';
import { CreateAliadoDto } from './dto/create-aliado.dto';
import { UpdateAliadoDto } from './dto/update-aliado.dto';

@Injectable()
export class AliadosService {
  create(createAliadoDto: CreateAliadoDto) {
    return 'This action adds a new aliado';
  }

  findAll() {
    return `This action returns all aliados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aliado`;
  }

  update(id: number, updateAliadoDto: UpdateAliadoDto) {
    return `This action updates a #${id} aliado`;
  }

  remove(id: number) {
    return `This action removes a #${id} aliado`;
  }
}
