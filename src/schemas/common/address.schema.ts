import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Address {
    @Prop({
        required: true
    })
    line1: string

    @Prop()
    line2?: string

    @Prop({
        required : true
    })
    city: string

    @Prop()
    state: string

    @Prop()
    zipCode : string
}

export const AddressSchema = SchemaFactory.createForClass(Address)