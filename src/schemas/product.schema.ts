import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "./category.schema";
import { subCategory } from "./subCategory.schema";
import { STATUS } from "src/constants";
import { Shipping } from "./shipping.schema";


@Schema({
    timestamps: true,
    versionKey: false
})
export class Product {
    @Prop({
        required : true
    })
    product_name : string

    @Prop({
        type : mongoose.Schema.Types.ObjectId, ref: 'Variation'
    })
    variation_type : string

    @Prop({
        type : Array
    })
    variation_value : string[]

    @Prop({
        required : true,
        type : mongoose.Schema.Types.ObjectId, ref: 'Category'
    })
    categoryId : Category

    @Prop({
        type : mongoose.Schema.Types.ObjectId, ref: 'subCategory'
    })
    subCategoryId : subCategory

    @Prop({
        required: true,
        length : 13
    })
    gtin : number

    @Prop({
        required : true
    })
    brand_name : string

    @Prop()
    manufacturer : string

    @Prop()
    description : string

    @Prop()
    quantity : number

    @Prop()
    condition : string

    @Prop()
    price : number

    @Prop()
    image_url : string

    @Prop({
        type : mongoose.Schema.Types.ObjectId, ref: 'Shipping'
    })
    shipping_group : Shipping

    @Prop({
        type : String,
        enum : Object.keys(STATUS),
        default : STATUS.ACTIVE
    })
    status? : STATUS

    @Prop({
        length : 10
    })
    sku : number

}

export type ProductDocument = Product & Document

export const ProductSchema = SchemaFactory.createForClass(Product)

export const PRODUCT_MODEL = Product.name