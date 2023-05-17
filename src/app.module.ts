import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { SellerModule } from './seller/seller.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { ProductModule } from './product/product.module';
import { VariationModule } from './variation/variation.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AdminsModule,
    UsersModule,
    SellerModule,
    CategoryModule,
    ProductModule,
    VariationModule,
    StockModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
