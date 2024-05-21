import { IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString, isString, IsString } from 'class-validator';

export class CreatePayoutDto {

    @IsNotEmpty()
    @IsString()
    totalAmount: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    reference: string;
  
    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    amount: string;
  
    @IsNotEmpty()
    @IsString()
    documentNumber: string;
  
    @IsNotEmpty()
    @IsString()
    documentType: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    accountNumber: string;

    @IsNotEmpty()
    @IsString()
    accountType: string;

    @IsNotEmpty()
    @IsString()
    bankCode: string;
}
