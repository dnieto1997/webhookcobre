import { Module } from '@nestjs/common';
import { AliadosService } from './aliados.service';
import { AliadosController } from './aliados.controller';

@Module({
  controllers: [AliadosController],
  providers: [AliadosService],
})
export class AliadosModule {}
