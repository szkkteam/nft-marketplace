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
import { AccountService } from './account.service';
import { Account } from './account.schema';

@Controller('/api/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async Signup(@Res() response, @Body() user: Account) {
    const newUser = await this.accountService.create(user);

    return response.status(HttpStatus.CREATED).json({ newUser });
  }

  @Get(':address')
  async getByAddress(@Param() params) {
    return this.accountService.getByAddress(params.address);
  }

  @Post('/login')
  async Login(@Res() response, @Body() user: Account) {
    return response.status(HttpStatus.OK).json({ status: 'ok' });
  }
}
