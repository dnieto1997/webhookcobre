import { Module } from '@nestjs/common';
import { CobreService } from './cobre.service';
import { CobreController } from './cobre.controller';
import { MovimientosModule } from 'src/movimientos/movimientos.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cobre } from './entities/cobre.entity';

@Module({
  controllers: [CobreController],
  providers: [CobreService],
  imports: [
    JwtModule.register({
      global: true,
      /* secret: jwtConstants.secret, */
    }),
    MovimientosModule,
    TypeOrmModule.forFeature([Cobre]),
  ],
})
export class CobreModule {}
