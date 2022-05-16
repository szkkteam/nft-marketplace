import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('/api/v1/assets')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get(':address')
  async listAll(@Param() params) {
    console.log(params);
    return this.tokenService.listAll(params.address);
  }
}
