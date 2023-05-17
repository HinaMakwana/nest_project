import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UpdateSellerDto } from 'src/seller/dtos/updateSeller.dto';
import { SellerService } from 'src/seller/service/seller/seller.service';

@Controller('profile')
export class SellerProfileController {
    constructor( private readonly sellerService : SellerService) {}

    @Get()
    viewProfile(@Req() req) {
        const id = req.sellerData.id
        return this.sellerService.findSeller(id)
    }

    @Patch()
    updateProfile(@Req() req, @Body() updateSellerDto : UpdateSellerDto) {
        const id = req.sellerData.id
        return this.sellerService.updateSeller(id,updateSellerDto)
    }
}
