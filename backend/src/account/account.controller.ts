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
  async Signup(@Body() user: Account) {
    return this.accountService.create(user);

  }

  @Get(':address')
  async getByAddress(@Param() params) {
    return this.accountService.getByAddress(params.address);
  }

}
