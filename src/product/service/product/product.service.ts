import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { createProductDto } from 'src/product/dtos/createProduct.dto';
import { editProductDto } from 'src/product/dtos/editProduct.dto';
import { OfferDto } from 'src/product/dtos/offer.dto';
import { PRODUCT_MODEL, ProductDocument } from 'src/schemas/product.schema';
import { StockService } from 'src/stock/service/stock.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(PRODUCT_MODEL) private productModel : Model<ProductDocument>,
        private readonly stockService : StockService
    ) {}

    async searchProduct(name) {
        const findProduct: ProductDocument[] = await this.productModel.find({
            product_name : new RegExp(name, 'i')
        })
        return findProduct
    }

    async createProduct(CreateProductDto : createProductDto){
        const findProduct = await this.productModel.findOne({ product_name : CreateProductDto.product_name})
        if(findProduct) {
            throw new ConflictException({
                error : 'Product name is available',
                message : 'product name must be unique'
            })
        }
        const data =await this.productModel.create(CreateProductDto)
        return data
    }

    async makeInactive(id : string) {
        const data = await this.productModel.findByIdAndUpdate({_id : id},{status : 'INACTIVE'})
        return {
            message : 'status updated',
            data : data
        }
    }

    async sellProduct(name: string,offerDto : OfferDto) {
        await this.productModel.updateOne({product_name : name}, offerDto)
        const data = await this.productModel.findOne({ product_name : name })
        const createData = {
            product_name : data.product_name,
            image_url : data.image_url,
            gtin : Number(data.gtin),
            quantity : Number(data.quantity),
            price : Number(data.price)
        }
        await this.stockService.create(createData)
        return {
            message : 'ok'
        }
    }

    async editProduct(id: string, EditProductDto : editProductDto){
        await this.productModel.updateOne({_id : id}, EditProductDto)
        return {
            msg : 'updated successfully'
        }
    }

}
