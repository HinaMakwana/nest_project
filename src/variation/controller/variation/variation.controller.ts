import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { VariationService } from 'src/variation/service/variation/variation.service';

@Controller('variation')
export class VariationController {
    constructor(
        private variationService : VariationService
    ){}

    @Post()
    async addVariation(@Body('name') name : string){
        return this.variationService.addVariation(name)
    }

    @Patch(':id')
    async updateVariation(@Body('name') name:string, @Param('id') id: string) {
        return this.variationService.updateVariation(id,name)
    }

    @Delete(':id')
    async deleteVariation(@Param('id') id) {
        return this.variationService.deleteVariation(id)
    }
}
