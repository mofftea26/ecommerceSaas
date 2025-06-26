import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Store } from '@prisma/client';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.StoreCreateInput): Promise<Store> {
    return this.prisma.store.create({ data });
  }

  findAll(): Promise<Store[]> {
    return this.prisma.store.findMany();
  }

  findOne(id: number): Promise<Store | null> {
    return this.prisma.store.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.StoreUpdateInput): Promise<Store> {
    return this.prisma.store.update({ where: { id }, data });
  }

  remove(id: number): Promise<Store> {
    return this.prisma.store.delete({ where: { id } });
  }
}
