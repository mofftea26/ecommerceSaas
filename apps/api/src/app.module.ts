import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [ProductModule, StoreModule],
})
export class AppModule {}
