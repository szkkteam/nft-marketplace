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
    /*
  @Get(':address')
  async listAll(@Param() params) {
    console.log(params);
    return this.tokenService.listAll(params.address);
  }
  */

  @Get('/:address/:tokenId')
  async getTokenDetail(@Res() response, @Param() params) {
    const result = await this.tokenService.getTokenDetail(params.address, params.tokenId);
    return response.status(HttpStatus.OK).json(result);
  }

  @Get('/:address/:tokenId/order')
  async getTokenOrders(@Param() params) {
    return this.tokenService.lastValidOrder(params.address, params.tokenId);
  }

  @Get('/:address/:tokenId/owner')
  async getOwner(@Param() params) {
    return this.tokenService.lastValidOrder(params.address, params.tokenId);
  }
}
