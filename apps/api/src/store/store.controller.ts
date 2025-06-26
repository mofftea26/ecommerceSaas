import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { StoreService } from './store.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stores')
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.findOne(id);
  }
}
