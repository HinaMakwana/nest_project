import { Body, Controller, NotAcceptableException, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFile, readFileSync } from 'fs';
import { diskStorage } from 'multer';
import { parse } from 'csv-parse'
import { createProductDto } from 'src/product/dtos/createProduct.dto';
import { ProductService } from 'src/product/service/product/product.service';
import { OfferDto } from 'src/product/dtos/offer.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService : ProductService
    ) {}

    @Post(':name')
    @UseInterceptors(FileInterceptor('image_url', {
        storage : diskStorage({
            destination : './product',
            filename : (req,file,cb) => {
                const filename = file.originalname
                cb(null,filename)
            },
        }),
        fileFilter: (req,file,cb) => {
            const fileType = file.mimetype.slice(0,5)
            if(fileType !== 'image') {
                return cb(null,false)
            }
            cb(null,true)
        }
    }))
    async createProduct(
        @Body() data,
        @UploadedFile() image_url : Express.Multer.File,
        @Param('name') name : string
        ){
        try {
            const productData = await this.productService.searchProduct(name)
            if (!productData[0]) {
                data.image_url = image_url.path
                return this.productService.createProduct(data)
            }
            if (productData !== null) {
                return this.productService.sellProduct(productData[0].product_name, data)

            }
        }
        catch(err) {
            throw new NotAcceptableException('extension of photo is not acceptable')
        }
    }

    @Patch(':id')
    async makeInactive(@Param('id') id:string) {
        return this.productService.makeInactive(id)
    }

    @Post('file')
    @UseInterceptors(FileInterceptor('file', {
        storage : diskStorage({
            destination : 'csvFile',
            filename : (req,file,cb) => {
                const filename = file.originalname
                cb(null,filename)
            },
        })
    }))
    async uploadFile() {
        const headers = [
            'product_name',
            'brand_name',
            'manufacturer',
            'image_url',
            'price',
            'categoryId',
            'subCategoryId',
            'gtin',
            'condition',
            'description',
            'quantity'
          ]
        const readfile = await readFileSync('csvFile/data.csv',{encoding :'utf-8'}).toString()
        const parseData = await parse(readfile, {
            delimiter : ',',
            columns : headers
        },(error, result)=> {
            if(error){
                console.error(error)
            }
            console.log('Result',result);
            console.log('type',typeof result.categoryId);

            return this.productService.createProduct(result)
        })

    }
}
