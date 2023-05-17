import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './service/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_MODEL, ProductSchema } from 'src/schemas/product.schema';
import {SellerMiddleware} from 'src/seller/middleware/seller/seller.middleware'
import { SELLER_MODEL, SellerSchema } from 'src/schemas/seller.schema';
import { JwtService } from '@nestjs/jwt';
import { StockService } from 'src/stock/service/stock.service';
import { STOCK_MODEL, StockSchema } from 'src/schemas/stock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name : PRODUCT_MODEL, schema : ProductSchema }]),
    MongooseModule.forFeature([{ name: SELLER_MODEL, schema : SellerSchema}]),
    MongooseModule.forFeature([{ name : STOCK_MODEL, schema : StockSchema }])
  ],
  controllers: [ProductController],
  providers: [ProductService, JwtService,StockService]
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SellerMiddleware)
    .forRoutes(ProductController)

  }
}
