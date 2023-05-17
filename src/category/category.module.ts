import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryController } from './controller/category/category.controller';
import { CategoryService } from './service/category/category.service';
import { CategoryMiddleware } from './middleware/category/category.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { CATEGORY_MODEL, CategorySchema } from 'src/schemas/category.schema';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { SUBCATEGORY_MODEL, SubCategorySchema } from 'src/schemas/subCategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name : CATEGORY_MODEL, schema : CategorySchema}]),
    MongooseModule.forFeature([{ name : SUBCATEGORY_MODEL, schema : SubCategorySchema}]),
    SubcategoryModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CategoryMiddleware)
    .forRoutes()
  }
}
