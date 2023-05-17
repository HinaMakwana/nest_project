import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CATEGORY_MODEL, CategoryDocument } from 'src/schemas/category.schema';
import { SUBCATEGORY_MODEL, subcategoryDocument } from 'src/schemas/subCategory.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(CATEGORY_MODEL)
        private categoryModel : Model<CategoryDocument>,
        @InjectModel(SUBCATEGORY_MODEL)
        private subcategoryModel : Model<subcategoryDocument>
    ) {}

    async addCategory(categoryDto : CategoryDto) {
        const data = await this.categoryModel.create(categoryDto)
        return data
    }

    async deleteCategory(id: string) {
        await this.categoryModel.deleteOne({ _id : id })
        await this.subcategoryModel.deleteMany({ categoryId : id })
        return { message : 'delete category successfully'}
    }

    async updateCategory(id: string, name) {

        const data = await this.categoryModel.updateOne({_id : id},{ name : name})
        return {
            message : 'category updated',
            Category : data
        }
    }

    async listCategory() {
        const data = await this.categoryModel.find()
        return data
    }
}
