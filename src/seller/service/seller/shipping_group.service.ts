import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SHIPPING_MODEL, ShippingDocument } from "src/schemas/shipping.schema"
import { EditShippingDto } from "src/seller/dtos/editShipping.dto"
import { ShippingDto } from "src/seller/dtos/shipping.dto"


@Injectable()
export class ShippingService {
    constructor(
        @InjectModel(SHIPPING_MODEL)
        private readonly shippingModel : Model<ShippingDocument>,
    ){}

    async createShippingGroup(shippingDto : ShippingDto) {
        const data = await this.shippingModel.create(shippingDto)
        return data
    }

    async editShippingGroup(id: string, editShippingDto : EditShippingDto) {
        const data = await this.shippingModel.updateOne({ _id : id }, editShippingDto)
        return {
            message : 'updated successfully',
            data : data
        }
    }

    async deleteShippingGroup(id: string) {
        await this.shippingModel.deleteOne({ _id : id })
        return {
            message : 'deleted successfully'
        }
    }

}