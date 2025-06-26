import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [ProductModule, StoreModule],
  providers: [PrismaService],
})
export class AppModule {}
