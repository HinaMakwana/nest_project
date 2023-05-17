import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document  } from "mongoose";

@Schema({
    timestamps: true,
    versionKey : false
})

export class Admin {
    @Prop({
        required:true
    })
    firstName : string

    @Prop({
        required:true
    })
    lastName : string

    @Prop({
        unique:[true, 'Duplicate email entered'],
        required:[true, 'email is required filed']
    })
    email : string

    @Prop({
        required: true
    })
    password : string

    @Prop({
        default : null,
        select : false
    })
    token : string
}

export type AdminDocument = Admin & Document
export const AdminSchema = SchemaFactory.createForClass(Admin)
export const ADMIN_MODEL = Admin.name
