import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CobreService } from './cobre.service';
import { CreateCobreDto } from './dto/create-cobre.dto';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { TokenCobreDto } from './dto/token-cobre.dto';

@Controller('cobre')
export class CobreController {

  constructor(private readonly cobreService: CobreService) {}

  @Post('payin')
  Payin(@Body() createCobreDto:CreateCobreDto) {
    return this.cobreService.Payin(createCobreDto);
  }

  @Post('payout')
  PayoutCobre(@Body() createPayoutDto:CreatePayoutDto) {
    return this.cobreService.Payout(createPayoutDto);
  }

  @Get('cash-in-links/:reference')
  PayoutCash(@Param('reference') reference: string) {
    return this.cobreService.PayoutCash(reference);
  }

  @Get('viewToken/:token')
  viewToken(@Param('token') token: string) {
    return this.cobreService.ViewToken(token);
  }

  @Post('tokensJwt')
  tokenJwt(@Body() credenciales:any) {
    return this.cobreService.tokenJwt(credenciales);
  }

  @Post('NewtokensJwt')
  newTokenJwt(@Body() credenciales:any) {
    return this.cobreService.newTokenJwt(credenciales);
  }

  @Post('Notify')
  notify(@Body() credenciales:any) {
    return this.cobreService.notify(credenciales);
  }

  @Post('statusEfecty')
  statusEfecty(@Body() credenciales:any) {
    return this.cobreService.statusEfecty(credenciales);
  }

}
