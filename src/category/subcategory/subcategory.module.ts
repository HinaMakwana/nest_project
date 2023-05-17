import { Module } from '@nestjs/common';
import { SubcategoryService } from './service/subcategory/subcategory.service';
import { SubcategoryController } from './controller/subcategory/subcategory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SUBCATEGORY_MODEL, SubCategorySchema } from 'src/schemas/subCategory.schema';
import { CategoryModule } from '../category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name : SUBCATEGORY_MODEL, schema : SubCategorySchema}]),
  ],
  providers: [SubcategoryService],
  controllers: [SubcategoryController]
})
export class SubcategoryModule {}
