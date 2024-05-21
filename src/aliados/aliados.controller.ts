import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AliadosService } from './aliados.service';
import { CreateAliadoDto } from './dto/create-aliado.dto';
import { UpdateAliadoDto } from './dto/update-aliado.dto';

@Controller('aliados')
export class AliadosController {
  constructor(private readonly aliadosService: AliadosService) {}

  @Post()
  create(@Body() createAliadoDto: CreateAliadoDto) {
    return this.aliadosService.create(createAliadoDto);
  }

  @Get()
  findAll() {
    return this.aliadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aliadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAliadoDto: UpdateAliadoDto) {
    return this.aliadosService.update(+id, updateAliadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aliadosService.remove(+id);
  }
}
