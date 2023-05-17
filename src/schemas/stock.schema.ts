import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { STATUS } from "src/constants";


@Schema({
    timestamps : true,
    versionKey : false
})

export class Stock {
    @Prop({
        required : true
    })
    image_url : string

    @Prop({
        required : true
    })
    product_name : string

    @Prop()
    gtin : number

    @Prop()
    quantity : number

    @Prop()
    price : number

    @Prop({
        type : String,
        enum : Object.keys(STATUS),
        default : STATUS.ACTIVE
    })
    status? : STATUS
}

export type StockDocument = Stock & Document

export const StockSchema = SchemaFactory.createForClass(Stock)

export const STOCK_MODEL = Stock.name