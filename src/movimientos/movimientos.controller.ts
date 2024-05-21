import { Body, Controller, Post} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';

@Controller('movimientos')
export class MovimientosController {

    constructor(private readonly movimientosService: MovimientosService) {}

    @Post('editUniv')
    Post(@Body() updateMovimientoDto:any) {
      return this.movimientosService.Post(updateMovimientoDto);
    }
}
