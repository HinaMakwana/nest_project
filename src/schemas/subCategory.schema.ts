import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import mongoose from "mongoose";
import { hash } from "bcrypt";


@Schema({
    timestamps : true,
    versionKey : false
})

export class subCategory {
    @Prop({
        required: true,
        type : mongoose.Schema.Types.ObjectId, ref: 'Category'
    })
    categoryId : Category
    @Prop({
        required : true
    })
    name : string
    @Prop({
        name : 'NumberOfProduct',
        default : 0
    })
    No_Of_Product : number
}
export type subcategoryDocument = subCategory & Document

export const SubCategorySchema = SchemaFactory.createForClass(subCategory)

export const SUBCATEGORY_MODEL = subCategory.name