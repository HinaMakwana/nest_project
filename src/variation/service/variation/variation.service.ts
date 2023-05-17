import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VARIATION_MODEL, variationDocument } from 'src/schemas/variation.schema';

@Injectable()
export class VariationService {
    constructor(
        @InjectModel(VARIATION_MODEL) private variationModel : Model<variationDocument>
    ){}

    async addVariation(name: string) {
        const data = await this.variationModel.create({name : name})
        return data
    }

    async updateVariation(id: string, name: string) {
        const data = await this.variationModel.updateOne({_id : id}, {name : name})
        return {
            message : 'variation updated',
            data : data
        }
    }

    async deleteVariation(id: string) {
        await this.variationModel.deleteOne({_id : id})
        return {
            message : 'variation deleted'
        }
    }
}
