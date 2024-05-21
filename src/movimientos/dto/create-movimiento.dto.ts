import { IsOptional, IsString } from "class-validator";

export class CreateMovimientoDto {

    @IsOptional()
    @IsString()
    uid:string

    @IsOptional()
    @IsString()
    user_phone?:string
}
