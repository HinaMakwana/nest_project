import { Module } from '@nestjs/common';
import { VariationController } from './controller/variation/variation.controller';
import { VariationService } from './service/variation/variation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VARIATION_MODEL, VariationSchema } from 'src/schemas/variation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name : VARIATION_MODEL, schema : VariationSchema }])
  ],
  controllers: [VariationController],
  providers: [VariationService]
})
export class VariationModule {}
