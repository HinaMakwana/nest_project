import { Controller, NotImplementedException, Param, Patch } from '@nestjs/common';
import { set } from 'mongoose';
import { ProductService } from 'src/product/service/product/product.service';
import { StockService } from 'src/stock/service/stock.service';

@Controller('stock')
export class StockController {
    constructor(
        private readonly stockService : StockService,
    ) {}

    @Patch(':id')
    async makeInactive(@Param('id') id: string) {
        const data = await this.stockService.findProduct(id)
        if(data.status == 'INACTIVE') {
            throw new NotImplementedException('Product already inactive')
        }
        return this.stockService.makeInactive(id)
    }
}
