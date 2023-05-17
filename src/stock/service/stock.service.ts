import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { STOCK_MODEL, StockDocument } from 'src/schemas/stock.schema';
import { StockDto } from '../dtos/stock.dto';
import { ProductService } from 'src/product/service/product/product.service';

@Injectable()
export class StockService {
    constructor(
        @InjectModel(STOCK_MODEL) private stockModel : Model<StockDocument>
    ) {}

    create(stockdto : StockDto) {
        return this.stockModel.create(stockdto)
    }
    async findProduct(id) {
        const data = await this.stockModel.findOne({_id : id})
        if(!data) throw new NotFoundException('stock not found')
        return data
    }

    async makeInactive(id) {
        await this.stockModel.updateOne({_id : id}, { status : 'INACTIVE' })
        return {
            message : 'product inactive'
        }
    }
}
