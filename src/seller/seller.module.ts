import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SellerController } from './controller/seller/seller.controller';
import { SellerService } from './service/seller/seller.service';
import { AdminsMiddleware } from 'src/admins/middleware/admins/admins.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ADMIN_MODEL, AdminSchema } from 'src/schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';
import { SELLER_MODEL, SellerSchema } from 'src/schemas/seller.schema';
import { SellerMiddleware } from './middleware/seller/seller.middleware';
import { SellerProfileController } from './controller/seller-profile/seller-profile.controller';
import { SHIPPING_MODEL, ShippingSchema } from 'src/schemas/shipping.schema';
import { ShippingController } from './controller/seller-profile/shipping_group.controller';
import { ShippingService } from './service/seller/shipping_group.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: ADMIN_MODEL, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name : SELLER_MODEL, schema : SellerSchema }]),
    MongooseModule.forFeature([{ name : SHIPPING_MODEL, schema : ShippingSchema }])
  ],
  controllers: [SellerController, SellerProfileController,ShippingController],
  providers: [SellerService,JwtService,ShippingService]
})
export class SellerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminsMiddleware)
    .forRoutes('seller/add','seller/delete')
    consumer.apply(SellerMiddleware)
    .forRoutes('seller/logout',SellerProfileController)
  }
}
