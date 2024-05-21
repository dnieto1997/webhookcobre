import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CobreModule } from './cobre/cobre.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PaytyModule } from './payty/payty.module';
import { AliadosModule } from './aliados/aliados.module';
import { LogsCallbacksModule } from './logs_callbacks/logs_callbacks.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '',
//   database: 'toppay_old',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: false,
// }),

//  TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: '129.213.170.8',
//   port: 3306,
 //  username: 'devToppay',
 //  password: 'TopPay%2023',
  // database: 'toppay',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
 //  synchronize: false,
// }), 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '129.213.170.8',
      port: 3306,
      username: 'devToppay',
      password: 'TopPay%2023',
      database: 'toppay',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CobreModule,
    MovimientosModule,
    PaytyModule,
    AliadosModule,
    LogsCallbacksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
