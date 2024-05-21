import { Module } from '@nestjs/common';
import { PaytyService } from './payty.service';
import { PaytyController } from './payty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from 'src/movimientos/entities/movimiento.entity';
import { Aliado } from 'src/aliados/entities/aliado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movimiento,Aliado])],
  controllers: [PaytyController],
  providers: [PaytyService],
})
export class PaytyModule {}
