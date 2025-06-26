import { Controller, Get, Post, Body } from '@nestjs/common';
import { StoreService } from './store.service';
import { Prisma } from '@prisma/client';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() data: Prisma.StoreCreateInput) {
    return this.storeService.create(data);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }
}
