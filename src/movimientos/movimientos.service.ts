import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Repository } from 'typeorm';
import { PayinInterface } from 'src/interfaces/payin.interface';
import { Aliado } from 'src/aliados/entities/aliado.entity';
import { apiAliados } from 'src/helpers/apiAliados';
import { LogsCallback } from 'src/logs_callbacks/entities/logs_callback.entity';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';

@Injectable()
export class MovimientosService {

  constructor(
    @InjectRepository(Movimiento)
    private movimientoRepository: Repository<Movimiento>,
    @InjectRepository(Aliado)
    private readonly aliadoRepository: Repository<Aliado>,
    @InjectRepository(LogsCallback)
    private readonly logsCallbacksRepository: Repository<LogsCallback>,
  ) {}

  async Post(updateMovimientoDto: any){
    const sqlPrepate = await this.movimientoRepository.preload(updateMovimientoDto);
    return await this.movimientoRepository.save(sqlPrepate);
  }

  async update(uid: string, updateMovimientoDto: PayinInterface) {

    const sqlExist = await this.movimientoRepository.findOneBy({uid});

    if (!sqlExist) {
      return false;
    }

    const sqlPrepate = await this.movimientoRepository.preload({
      uid: sqlExist.uid,
      reference_pro2: updateMovimientoDto.cashInNoveltyDetailUuid,
      linkpro: updateMovimientoDto.paymentRedirectUrl
      // linkpro: updateMovimientoDto.linkUrl
    });

    return await this.movimientoRepository.save(sqlPrepate);
  }

  async viewUid(uid: string) { 

    const sqlExist = await this.movimientoRepository.findOneBy({uid});
    
    return sqlExist;
  }

  async viewReference(reference: string) { 

    const sqlExist = await this.movimientoRepository.findOneBy({reference});

    return sqlExist;
  }

  async viewReferenceUrl(reference: string, status:string, msg:string) { 

    const movimiento = await this.movimientoRepository
    .createQueryBuilder('m')
    .innerJoin('aliado', 'a', 'a.uid = m.merchant_id')
    .select(['m.*', 'a.url_response'])
    .where('m.uid = :uid', { uid:reference })
    .getRawOne();

    if( status == "FINISHED" ){

      const sqlPrepate = await this.movimientoRepository.preload({
        uid: movimiento.uid,
        notify: "E",
        status:"1"
      });

      const savePrepate = await this.movimientoRepository.save(sqlPrepate);

      const api = await apiAliados(movimiento.reference,movimiento.uid,msg,"success",movimiento.currency,movimiento.amount,movimiento.method,movimiento.a_url_response);

      let raw = JSON.stringify({
          "reference": `${movimiento.reference}`,
          "status": `success`,
          "method": `${movimiento.method}`,
          "amount": `${movimiento.amount}`,
          "currency": `${movimiento.currency}`,
          "referenceid": `${movimiento.uid}`,
      });

      let data = {
        referenceid : movimiento.uid,
        reference   : movimiento.reference,
        amount : movimiento.amount,
        method : movimiento.method,
        user_created : "WebhookCobre",
        merchant_id : movimiento.merchant_id,
        merchant_name : movimiento.merchant_name,
        currency : movimiento.currency,
        url_callback: movimiento.a_url_response,
        status : "1",
        upload_support : `${new Date()}`,
        date_notify : `${new Date()}`,
        json : raw,
        resp_callback : JSON.stringify(api),
      }

      const nuevoLog = this.logsCallbacksRepository.create(data);

      await this.logsCallbacksRepository.save(nuevoLog);

      return  {
        success : true,
        message : 'Proceso terminado exitosamente'}

    }else  if( status == "REJECTED" ){

      const sqlPrepate = await this.movimientoRepository.preload({
        uid: movimiento.uid,
        notify: "E",
        status:"3"
      });

      const savePrepate = await this.movimientoRepository.save(sqlPrepate);

      const api = await apiAliados(movimiento.reference,movimiento.uid,msg,"declined",movimiento.currency,movimiento.amount,movimiento.method,movimiento.a_url_response);

      let raw = JSON.stringify({
        "reference": `${movimiento.reference}`,
        "status": `declined`,
        "method": `${movimiento.method}`,
        "amount": `${movimiento.amount}`,
        "currency": `${movimiento.currency}`,
        "referenceid": `${movimiento.uid}`,
        "ErrSms": `${msg}`,
      });

      let data = {
        referenceid : movimiento.uid,
        reference   : movimiento.reference,
        amount : movimiento.amount,
        method : movimiento.method,
        user_created : "WebhookCobre",
        merchant_id : movimiento.merchant_id,
        merchant_name : movimiento.merchant_name,
        currency : movimiento.currency,
        url_callback: movimiento.a_url_response,
        status : "3",
        upload_support : `${new Date()}`,
        date_notify : `${new Date()}`,
        json : raw,
        resp_callback : JSON.stringify(api),
        
      }

      const nuevoLog = this.logsCallbacksRepository.create(data);

      await this.logsCallbacksRepository.save(nuevoLog);

      return  {
        success : true,
        message : 'Proceso terminado exitosamente'}
    }

  }

  async statusEfecty(id:string,metodo:string){

    const sqlExist = await this.movimientoRepository.findOneBy({uid:id});

    const sqlUpdate = await this.movimientoRepository.preload({
      uid:sqlExist.uid,
      method:metodo
    });

    const sqlSave = await this.movimientoRepository.save(sqlUpdate);
    
    return sqlSave;
  }

}
