import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SUBCATEGORY_MODEL, subcategoryDocument } from 'src/schemas/subCategory.schema';

@Injectable()
export class SubcategoryService {
    constructor(
        @InjectModel(SUBCATEGORY_MODEL)
        private subCategoryModel : Model<subcategoryDocument>
    ){}

    async createCategory(SubCategoryDto){
        const data = (await this.subCategoryModel.create(SubCategoryDto)).populate('categoryId')
        return data
    }

    async listAll() {
        const data = await this.subCategoryModel.find().populate('categoryId')
        return data
    }

    async updateCategory(id : string, name : string) {
        const data = await this.subCategoryModel.updateOne({_id : id}, {name : name})
        return {
            message : 'category updated',
            data : data
        }
    }

    async deleteCategory(id: string) {
        await this.subCategoryModel.deleteOne({ _id : id })
        return {
            message : 'category deleted'
        }
    }
}
