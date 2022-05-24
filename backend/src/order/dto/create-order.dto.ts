import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrder {
  @IsNotEmpty()
  @IsNumber()
  public listingTime: number;

  @IsNotEmpty()
  @IsNumber()
  public expirationTime: number;

  @IsNotEmpty()
  @IsString()
  public currentPrice: string;

  @IsNotEmpty()
  @IsString()
  public calldata: string;

  @IsNotEmpty()
  @IsString()
  public v: string;

  @IsNotEmpty()
  @IsString()
  public r: string;

  @IsNotEmpty()
  @IsString()
  public s: string;

  @IsNotEmpty()
  @IsString()
  public salt: string;

  @IsNotEmpty()
  @IsString()
  public paymentToken: string;

  @IsNotEmpty()
  @IsString()
  public token: string;

  @IsNotEmpty()
  @IsString()
  public asset: string;

  @IsNotEmpty()
  @IsString()
  public maker: string;
}
