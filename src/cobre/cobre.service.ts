import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCobreDto } from './dto/create-cobre.dto';
import {
  CobrePayin,
  CobrePayoutCobre,
  Token,
  cashInLinks,
} from 'src/helpers/apiTransaccion';
import { TokenInteface } from 'src/interfaces/tokenCobre.interface';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { MovimientosService } from 'src/movimientos/movimientos.service';
import { JwtService } from '@nestjs/jwt';
import { TokenCobreDto } from './dto/token-cobre.dto';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { readFileSync } from 'fs';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Cobre } from './entities/cobre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CobreService {
  /*  public url:string = 'https://api-ext.qa.cobre.co/';
   public apikey:string='lBSnFahoNECO14JUlS9g6Dm4XsxniVS49pZDPcZc';
   public BasicPass:string= `M2cxMW02N243cmttNTFoazBqZzFtOTgzMTg6OGZoa21nZWNiODVqNHFycWx0N2R2YnE4dXJ2b3EydjFuZzNrNmlrOGI4aThnbDRoOGww`; */

  public url: string = 'https://api-ext.cobre.co/';
  public apikey: string = 'V40gKD3mjl6xONlJbdNnQ7LtaXfX4XkQ8XWP4itP';
  public BasicPass: string = `czEwOWNraGE4aGN2cWUzMjBsbWliMDA1cDoxdXNmdG85cXE4cWtrNjI0OG1rNGVhdHI3MzhnYmM4bzNwbG5jYmp1OW00MmZhNHVuMHY=`;

  constructor(
    private readonly movimientoService: MovimientosService,
    private jwtService: JwtService,
    @InjectRepository(Cobre)
    private readonly requestcobre: Repository<Cobre>,
  ) {}

  async Payin(createCobreDto: CreateCobreDto) {
    /* GENERAR TOKEN */
    const buscarToken: any = await Token(this.url, this.apikey, this.BasicPass);

    const { access_token, expires_in, token_type } = buscarToken;

    const reference = createCobreDto.reference;

    let payload;
    let payload2;
    let urlReturn = 'https://toppaylatam.com/';
    if (createCobreDto.inscrita) {
      urlReturn = createCobreDto.inscrita;
    }

    // payload = {
    //   cellPhone: createCobreDto.cellPhone,
    //   email: createCobreDto.email,
    //   amount: createCobreDto.amount,
    //   redirectUrl: urlReturn,
    //   document: createCobreDto.document,
    //   documentType: createCobreDto.documentType,
    //   expirationDate: dayjs().format("YYYY-MM-DD"),
    //   fullName: createCobreDto.fullName,
    //   description: createCobreDto.description,
    //   references: [reference],
    //   notificationMethods: ['ONLINE'],
    //   enabledPaymentMethods: [createCobreDto.method]
    // };

    payload = {
      cashInInfo: {
        amount: createCobreDto.amount,
        currency: 'COP',
        productName: 'Create payin single transaction',
        description: 'Generate link of single transaction',
        redirectUrl: urlReturn,
        paymentInfo: {
          method: createCobreDto.method,
          metadata: {
            bankCode: '',
          },
        },
        references: {
          Country: 'Colombia',
          CaseNumber: reference,
        },
      },
      payerInfo: {
        fullName: createCobreDto.fullName,
        cellphone: createCobreDto.cellPhone,
        document: createCobreDto.document,
        documentType: createCobreDto.documentType,
        email: createCobreDto.email,
      },
    };

    if (createCobreDto.bankCode) {
      // payload = {
      //   cellPhone: createCobreDto.cellPhone,
      //   email: createCobreDto.email,
      //   amount: createCobreDto.amount,
      //   redirectUrl: urlReturn,
      //   document: createCobreDto.document,
      //   documentType: createCobreDto.documentType,
      //   expirationDate: dayjs().format("YYYY-MM-DD"),
      //   fullName: createCobreDto.fullName,
      //   description: createCobreDto.description,
      //   references: [reference],
      //   notificationMethods: ['ONLINE'],
      //   enabledPaymentMethods: [createCobreDto.method],
      //   paymentMethodsConfiguration: {
      //     bankCode: createCobreDto.bankCode
      //   }
      // };

      payload = {
        cashInInfo: {
          amount: createCobreDto.amount,
          currency: 'COP',
          productName: 'Create payin single transaction',
          description: 'Generate link of single transaction',
          redirectUrl: urlReturn,
          paymentInfo: {
            method: createCobreDto.method,
            metadata: {
              bankCode: createCobreDto.bankCode,
            },
          },
          references: {
            Country: 'Colombia',
            CaseNumber: reference,
          },
        },
        payerInfo: {
          fullName: createCobreDto.fullName,
          cellphone: createCobreDto.cellPhone,
          document: createCobreDto.document,
          documentType: createCobreDto.documentType,
          email: createCobreDto.email,
        },
      };
    }

    const buscarPayin: any = await CobrePayin(
      access_token,
      this.url,
      this.apikey,
      reference,
      payload,
    );
    const newCobre = this.requestcobre.create({
      request: JSON.stringify(payload),
      reference: reference,
      resp: JSON.stringify(buscarPayin),
      createdAt: new Date(),
    });

    console.log(newCobre);

    const saveTable = await this.requestcobre.save(newCobre);

    console.log(saveTable);

    if (buscarPayin.errorCode == '046') {
      const jsonMovimiento = await this.movimientoService.viewUid(reference);

      if (!jsonMovimiento.linkpro) {
        throw new NotFoundException(
          buscarPayin.message + ' (' + buscarPayin.moreInfo[0].message + ')',
        );
      }
      return {
        url: jsonMovimiento.linkpro,
      };
    } else if (buscarPayin.errorCode == '501') {
      throw new NotFoundException(
        buscarPayin.message + ' (' + buscarPayin.moreInfo[0].message + ')',
      );
    }

    const updateMovimientos = await this.movimientoService.update(
      reference,
      buscarPayin,
    );

    return {
      // url: buscarPayin.linkUrl
      url: buscarPayin.paymentRedirectUrl,
    };
  }

  async Payout(createPayoutDto: CreatePayoutDto) {
    /* GENERAR TOKEN */
    const buscarToken: any = await Token(this.url, this.apikey, this.BasicPass);

    const { access_token, expires_in, token_type } = buscarToken;

    const payload = {
      controlRecord: 1,
      noveltyDetails: [
        {
          type: 'TRANSFER',
          totalAmount: createPayoutDto.amount,
          walletCode: null,
          description: createPayoutDto.description,
          descriptionExtra1: '',
          descriptionExtra2: '',
          descriptionExtra3: '',
          dueDate: '',
          reference: createPayoutDto.reference,
          beneficiary: {
            documentType: createPayoutDto.documentType,
            documentNumber: createPayoutDto.documentNumber,
            name: createPayoutDto.name,
            lastName: createPayoutDto.lastName,
            email: createPayoutDto.email,
            phone: createPayoutDto.phone,
            bankInfo: {
              bankCode: createPayoutDto.bankCode,
              accountType: createPayoutDto.accountType,
              accountNumber: createPayoutDto.accountNumber,
            },
          },
        },
      ],
    };

    const crearPayout = await CobrePayoutCobre(
      access_token,
      this.url,
      this.apikey,
      payload,
    );

    return crearPayout;
  }

  async PayoutCash(reference: string) {
    /* GENERAR TOKEN */
    const buscarToken: any = await Token(this.url, this.apikey, this.BasicPass);

    const { access_token, expires_in, token_type } = buscarToken;

    const resp = await cashInLinks(
      access_token,
      this.url,
      this.apikey,
      reference,
    );

    return resp;
  }

  async tokenJwt(credenciales: any) {
    const { bank, token } = credenciales;

    const rokenJwt = this.jwtService.decode(token);

    const { code } = rokenJwt;

    const jsonMovimiento = await this.movimientoService.viewUid(code);

    const regex = /^57[0-9]{10}$/;

    let phone = '';

    if (jsonMovimiento.user_phone == '+5713562778893') {
      jsonMovimiento.user_phone = '3170137744';
    }

    if (regex.test(jsonMovimiento.user_phone)) {
      phone = jsonMovimiento.user_phone;
    } else {
      phone = '57' + jsonMovimiento.user_phone;
    }

    let varInscrita: any = 'https://toppaylatam.com/';

    if (jsonMovimiento.inscrita) {
      varInscrita = jsonMovimiento.inscrita;
    }

    const payload: any = {
      reference: jsonMovimiento.uid,
      cellPhone: '+' + phone,
      email: jsonMovimiento.user_email,
      amount: jsonMovimiento.amount,
      inscrita: varInscrita,
      document: jsonMovimiento.user_doc,
      documentType: 'CC',
      expirationDate: dayjs().format('YYYY-MM-DD'),
      fullName: jsonMovimiento.user_name,
      description: 'recarga',
      method: 'PSE',
      bankCode: bank,
    };

    return this.Payin(payload);
  }

  async ViewToken(credenciales: string) {
    if (credenciales == 'undefined') {
      return { status: 0, msg: 'Error de token' };
    }

    const rokenJwt = this.jwtService.decode(credenciales);

    const { code } = rokenJwt;

    const jsonMovimiento = await this.movimientoService.viewUid(code);

    if (!jsonMovimiento) {
      return { status: 0, msg: 'Error de token' };
    }

    if (jsonMovimiento.status == '1') {
      return { status: 0, msg: 'Esta solicitud esta pagada' };
    }

    if (jsonMovimiento.status == '3') {
      return { status: 0, msg: 'Error en la referencia de pago' };
    }

    const rutaMenu = join(__dirname, '../../public/json/menu.json');
    const datosMenu = readFileSync(rutaMenu, { encoding: 'utf8' });
    const menu = JSON.parse(datosMenu);

    const rutaAliado = join(__dirname, '../../public/json/proveedor.json');
    const datosAliado = readFileSync(rutaAliado, { encoding: 'utf8' });
    const idsProveedor = JSON.parse(datosAliado);

    const rutaBoton = join(__dirname, '../../public/json/button.json');
    const datosBoton = readFileSync(rutaBoton, { encoding: 'utf8' });
    const idsBoton = JSON.parse(datosBoton);

    if (idsProveedor.includes(parseInt(jsonMovimiento.merchant_id))) {
      menu[0].entidad = menu[0].entidad.filter(
        (objeto) => objeto.componente == 'COBRE',
      );
    } else {
      menu[0].entidad = menu[0].entidad.filter(
        (objeto) => objeto.componente == 'PAYTY',
      );
    }

    let statusBtn = false;

    if (idsBoton.includes(parseInt(jsonMovimiento.merchant_id))) {
      statusBtn = true;
    }

    return { status: 1, jsonMovimiento, menu, statusBtn };
  }

  async newTokenJwt(credenciales: any) {
    const { banck, token } = credenciales;

    const rokenJwt = this.jwtService.decode(token);

    const { code } = rokenJwt;

    const jsonMovimiento = await this.movimientoService.viewUid(code);

    const regex = /^57[0-9]{10}$/;

    let phone = '';

    if (regex.test(jsonMovimiento.user_phone)) {
      phone = jsonMovimiento.user_phone;
    } else {
      phone = '57' + jsonMovimiento.user_phone;
    }

    const payload: any = {
      reference: jsonMovimiento.uid,
      cellPhone: '+' + phone,
      email: jsonMovimiento.user_email,
      amount: jsonMovimiento.amount,
      document: jsonMovimiento.user_doc,
      documentType: 'CC',
      expirationDate: jsonMovimiento.expiration,
      fullName: jsonMovimiento.user_name,
      description: 'recarga',
      method: 'PSE',
      bankCode: banck,
    };

    return this.Payin(payload);
  }

  async notify(credenciales: any) {
    const { transactionType, status, reference, descriptionStatus } =
      credenciales;

    if (transactionType == 'DEBIT') {
      const jsonMovimiento: any = await this.movimientoService.viewReferenceUrl(
        reference,
        status,
        descriptionStatus,
      );

      return jsonMovimiento;
    }

    return {
      success: false,
      message: 'El tipo de transaccion no pertenece al PAYOUT',
      arr: credenciales,
    };
  }

  async statusEfecty(credenciales: any) {
    const { id, metodo } = credenciales;

    const sql = await this.movimientoService.statusEfecty(id, metodo);
    return sql;
  }
}
