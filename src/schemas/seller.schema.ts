import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address, AddressSchema } from "./common/address.schema";
import { hash } from "bcrypt";
import { STATUS } from "src/constants";



@Schema({
    timestamps : true,
    versionKey : false
})

export class Seller {

    @Prop({
        required : true
    })
    firstName : string

    @Prop({ required : true })
    lastName : string

    @Prop({ required : true })
    email : string

    @Prop({ required : true, select : false })
    password : string

    @Prop({ required : true })
    bussinessName : string

    @Prop({ required : true })
    contactNo : number

    @Prop({ required : true, type : AddressSchema })
    address : Address

    @Prop({ required : true })
    LucidNo : number

    @Prop({ required : false })
    VAT_NO : number

    @Prop({
        type : String,
        enum : Object.keys(STATUS),
        default : STATUS.ACTIVE
    })
    type?: STATUS

    @Prop({
        default: null,
        select : false
    })
    token : string
}

export type SellerDocument = Seller & Document

export const SellerSchema = SchemaFactory.createForClass(Seller)

SellerSchema.pre("save", async function(next) {
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
    next()
})
export const SELLER_MODEL = Seller.name
