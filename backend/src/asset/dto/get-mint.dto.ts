import {
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';

  class Supply {
    @IsNotEmpty()
    @IsString()
    public totalSupply: string;

    @IsNotEmpty()
    @IsString()
    public maximumSupply: string;
  }

  export class GetMint {
    @IsNotEmpty()
    @IsString()
    public name: string;
  
    @IsNotEmpty()
    @IsString()
    public slug: string;
  
    @IsNotEmpty()
    @IsString()
    public address: string;

    @IsOptional()
    public supply: Supply;
  }
  