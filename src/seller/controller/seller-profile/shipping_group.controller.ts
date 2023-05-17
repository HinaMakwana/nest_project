import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { EditShippingDto } from "src/seller/dtos/editShipping.dto";
import { ShippingDto } from "src/seller/dtos/shipping.dto";
import { ShippingService } from "src/seller/service/seller/shipping_group.service";

@Controller('shipping')
export class ShippingController {
    constructor(
        private readonly shippingService : ShippingService
    ){}

    @Post()
    createShipping(@Body() shippingDto : ShippingDto) {
        return this.shippingService.createShippingGroup(shippingDto)
    }

    @Patch(':id')
    editShipping(@Param('id') id: string,@Body() editShippingDto : EditShippingDto) {
        return this.shippingService.editShippingGroup(id,editShippingDto)
    }

    @Delete(':id')
    deleteShipping(@Param('id') id: string) {
        return this.shippingService.deleteShippingGroup(id)
    }
}