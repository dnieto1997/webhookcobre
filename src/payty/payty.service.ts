import { Injectable } from '@nestjs/common';
import { CreatePaytyDto } from './dto/create-payty.dto';
import { UpdatePaytyDto } from './dto/update-payty.dto';
import { listBank } from 'src/helpers/apiTransaccion';
import { Movimiento } from 'src/movimientos/entities/movimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aliado } from 'src/aliados/entities/aliado.entity';
import { pagosPayty } from 'src/helpers/apiPayty';

@Injectable()
export class PaytyService {

  constructor(
    @InjectRepository(Movimiento)
    private movimientoRepository: Repository<Movimiento>,
    @InjectRepository(Aliado)
    private aliadoRepository: Repository<Aliado>,
  ) {}
  
  async create(createPaytyDto: any) {

    const { info, info2 } = createPaytyDto;

    let cost = 0;
    let iva = 0;

    const aliadosArr = await this.aliadoRepository.findOneBy({uid:info2.merchant_id});

    if(info.method == "TUP_PSE"){
      cost = (Number(info2.amount)*Number(aliadosArr.pse_porcentaje/100)) + Number(aliadosArr.pse_fijo);
      iva = cost * aliadosArr.iva;
    }else if(info.method == "TUP_NEQUI"){
      cost = (Number(info2.amount)*Number(aliadosArr.pse_porcentaje/100)) + Number(aliadosArr.pse_fijo);
      iva = cost * aliadosArr.iva;
    }else if(info.method == "TUP_DAVIPLATA"){
      cost = (Number(info2.amount)*Number(aliadosArr.pse_porcentaje/100)) + Number(aliadosArr.pse_fijo);
      iva = cost * aliadosArr.iva;
    }

   
    const sqlUpdate = await this.movimientoRepository.preload({
      uid: info2.uid,
      user_doc: info.doc,
      user_type: info.topdoc,
      user_name: info.name,
      user_phone: info.phone,
      user_email: info.email,
      user_address: info.dir,
      user_num_account:info.numcuenta,
      user_bank:info.banco,
      user_typeuser:"",
      method: info.method,
      cost : cost,
      iva : iva,
      updated_at: new Date(),
      reference_pro:"0",
      reference_pro2:"0",
      linkpro:"0"
    });

    const arr = {
        amount:info2.amount,
        email:info.email,
        name:info.name,
        phone:info.phone,
        topdoc:info.topdoc,
        doc:info.doc,
        reference:info2.reference,
        linkpro:info2.linkpro,
        reference_pro2:info2.reference_pro2,
        inscrita:info2.inscrita
      }

    const sqlSave = await this.movimientoRepository.save(sqlUpdate);

    const api:any = await pagosPayty(arr);
     
    if(api.url){
      return {url:api.url};
    }else{
      const orderId = api.resp.answer.paymentOrderId;
      const url = api.resp.answer.paymentURL;

      const sqlUpdate2 = await this.movimientoRepository.preload({
        uid: info2.uid,
        reference_pro: info2.uid,
        reference_pro2: orderId,
        linkpro: url
      });

      const sqlSave2 = await this.movimientoRepository.save(sqlUpdate2);

      return {url};
    }

  }

  async findAll() {

    const url = 'https://api.apagar.co/api/v1/payments/get/features';
    const token = 'Bearer 1663864228185JDJiJDEwJGdXV1U4cGpvdzBsZWhhNU1ZZVBacnVBVy5PYXpQZ0tEN3d0b1RjbjB4aS9leFlXNk5hYVoy';

    const postData = {
      "data": {
        "PaymentMethod": {
          "id": 8
        }
      }
    };

    const consult = await listBank(token,url,postData);

    return consult;
  }

  findOne(id: number) {
    return `This action returns a #${id} payty`;
  }

  update(id: number, updatePaytyDto: UpdatePaytyDto) {
    return `This action updates a #${id} payty`;
  }

  remove(id: number) {
    return `This action removes a #${id} payty`;
  }
}
