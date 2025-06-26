import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
