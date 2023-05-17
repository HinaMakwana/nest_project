import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true,
    versionKey : false
})

export class Shipping {
    @Prop({
        required  :true
    })
    name : string

    @Prop({
        required : true
    })
    address : string

    @Prop({
        required : true
    })
    Region : string

    @Prop({
        required : true
    })
    transit_time : number

    @Prop({
        required : true
    })
    shipping_cost : number

    @Prop({
        required : true
    })
    shipping_partner : string
}

export type ShippingDocument = Shipping & Document

export const ShippingSchema = SchemaFactory.createForClass(Shipping)

export const SHIPPING_MODEL = Shipping.name