import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Aliado } from 'src/aliados/entities/aliado.entity';
import { LogsCallback } from 'src/logs_callbacks/entities/logs_callback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movimiento, Aliado, LogsCallback])],
  controllers: [MovimientosController],
  providers: [MovimientosService],
  exports: [ MovimientosService]
})
export class MovimientosModule {}
