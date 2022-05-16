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

import { OrderService } from './order.service';
import { Order } from './order.schema';
import { CreateOrder } from './dto/create-order.dto';

@Controller('/api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: CreateOrder): Promise<Order> {
    return this.orderService.create(body);
  }
}
