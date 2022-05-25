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
  Query,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { Order } from './order.schema';
import { CreateOrder } from './dto/create-order.dto';
import { FinalizeOrder } from './dto/finalize-order.dto';

@Controller('/api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: CreateOrder): Promise<Order> {
    console.log(body);
    return this.orderService.create(body);
  }

  @Post('/:id/finalize')
  async finalize(@Body() body: FinalizeOrder, @Param() params): Promise<Order> {
    return this.orderService.finalize(params.id, body);
  }

  @Get('/filter')
  async findByFilter(
    @Query('address') address,
    @Query('finalized') finalized = false,
  ): Promise<Order[]> {
    console.log(`
      asset: ${address}
      finalized: ${finalized}
    `)
    return this.orderService.findByFilter(address, finalized);
  }
}
