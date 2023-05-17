import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true,
    versionKey: false
})
export class Variation {
    @Prop({
        required : true
    })
    name : string
}

export type variationDocument = Variation & Document

export const VariationSchema = SchemaFactory.createForClass(Variation)

export const VARIATION_MODEL = Variation.name