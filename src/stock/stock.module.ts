import { Module } from '@nestjs/common';
import { StockController } from './controller/stock/stock.controller';
import { StockService } from './service/stock.service';
import { MongooseModule } from '@nestjs/mongoose';
import { STOCK_MODEL, StockSchema } from 'src/schemas/stock.schema';
import { ProductService } from 'src/product/service/product/product.service';
import { PRODUCT_MODEL, ProductSchema } from 'src/schemas/product.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name : STOCK_MODEL, schema : StockSchema }]),
    MongooseModule.forFeature([{ name : PRODUCT_MODEL, schema : ProductSchema }]),
  ],
  controllers: [StockController],
  providers: [StockService,ProductService]
})
export class StockModule {}
