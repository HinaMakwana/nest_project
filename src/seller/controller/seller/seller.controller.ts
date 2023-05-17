import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { CreateSellerDto } from 'src/seller/dtos/createSeller.dto';
import { sellerLoginDto } from 'src/seller/dtos/sellerLogin.dto';
import { SellerService } from 'src/seller/service/seller/seller.service';

@Controller('seller')
export class SellerController {
    constructor(
        private readonly sellerService : SellerService
    ){}

    @Post('add')
    createSeller(@Body() createSellerDto : CreateSellerDto){
        return this.sellerService.createSeller(createSellerDto)
    }

    @Post('login')
    login(@Body() SellerLoginDto : sellerLoginDto){
        const { email, password } = SellerLoginDto
        return this.sellerService.login(email,password)
    }

    @Post('logout')
    async logout(@Req() req) {
        const sellerId = req.sellerData.id
        return await this.sellerService.logout(sellerId)
    }

    @Delete('delete')
    async deleteSeller(@Param('id') id: string) {
        return this.sellerService
    }
}
