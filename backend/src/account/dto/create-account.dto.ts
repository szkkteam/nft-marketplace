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
    @IsOptional()
    @IsString()
    public username: string;
  
    @IsNotEmpty()
    @IsString()
    public address: string;
  
    @IsNotEmpty()
    @IsString()
    public proxy: string;
  
  }
  