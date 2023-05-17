import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document  } from "mongoose";
import { STATUS, TYPE } from "src/constants";
import { Address, AddressSchema } from "./common/address.schema";
import { hash } from 'bcrypt'

@Schema({
    timestamps: true,
    versionKey : false
})

export class User {

    @Prop({
        unique : true
    })
    username: string

    @Prop()
    firstName : string

    @Prop()
    lastName : string

    @Prop({
        unique:[true, 'Duplicate email entered']
    })
    email : string

    @Prop({select: false})
    password : string

    @Prop({
        length: 10,
    })
    phoneNo : number

    @Prop({
        type : String,
        enum : Object.keys(STATUS),
        default : STATUS.ACTIVE
    })
    status? : STATUS

    @Prop({
        type : AddressSchema,
        required : false
    })
    address?: Address

    @Prop({
        type : String,
        enum : Object.keys(TYPE),
        default : TYPE.USER
    })
    type?: TYPE

    @Prop({
        default: null,
        select : false
    })
    token: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre("save", async function(next) {
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
    next()
})
export const USER_MODEL = User.name
