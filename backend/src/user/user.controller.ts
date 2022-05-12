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
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    const newUser = await this.userService.create(user);

    return response.status(HttpStatus.CREATED).json({ newUser });
  }

  @Post('/login')
  async Login(@Res() response, @Body() user: User) {
    return response.status(HttpStatus.OK).json({ status: 'ok' });
  }
}
