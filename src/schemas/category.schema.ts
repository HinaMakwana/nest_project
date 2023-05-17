import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true,
    versionKey : false
})

export class Category {
    @Prop()
    name : string
    @Prop()
    photo : string
}

export type CategoryDocument = Category & Document

export const CategorySchema = SchemaFactory.createForClass(Category)

export const CATEGORY_MODEL = Category.name