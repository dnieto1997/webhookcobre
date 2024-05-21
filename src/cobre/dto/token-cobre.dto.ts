import { IsNotEmpty,IsString} from 'class-validator';

export class TokenCobreDto {

    @IsNotEmpty()
    @IsString()
    token: string;
  
}
