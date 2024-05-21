import { IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString, isString, IsString, IsOptional, IsJSON, IsArray } from 'class-validator';

export class CreateCobreDto {

    @IsNotEmpty()
    @IsString()
    reference: string;
  
    @IsNotEmpty()
    @IsString()
    cellPhone: string;
  
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    amount: string;
  
    @IsNotEmpty()
    @IsString()
    document: string;
  
    @IsNotEmpty()
    @IsString()
    documentType: string;
  
    @IsNotEmpty()
    @IsString()
    expirationDate: string;
  
    @IsNotEmpty()
    @IsString()
    fullName: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    method: string;

    @IsOptional()
    @IsString()
    bankCode?:string

    @IsOptional()
    @IsString()
    inscrita?:string
}
