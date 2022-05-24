import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class FinalizeOrder {
  @IsOptional()
  @IsString()
  public finalizeTime: string;

  @IsNotEmpty()
  @IsString()
  public taker: string;
}
