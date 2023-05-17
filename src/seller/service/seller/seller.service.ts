import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { SELLER_MODEL, SellerDocument } from 'src/schemas/seller.schema';
import { CreateSellerDto } from 'src/seller/dtos/createSeller.dto';
import { UpdateSellerDto } from 'src/seller/dtos/updateSeller.dto';
import { comparePassword } from 'src/util/bcrypt';

@Injectable()
export class SellerService {
    constructor(
        @InjectModel(SELLER_MODEL)
        private readonly sellerModel : Model<SellerDocument>,
        private readonly jwtService : JwtService
    ){}

    async createSeller(createSellerDto : CreateSellerDto){
        const seller = await this.sellerModel.create(createSellerDto)
        return seller
    }

    async login(email : string, password : string) {
        const findSeller = await this.sellerModel.findOne({ email : email },'+password')
        const matchPassword = await comparePassword(password,findSeller.password)
        if(!matchPassword){
            throw new ConflictException('password not matched')
        }
        const token = await this.jwtService.sign({id : findSeller._id, type : findSeller.type}, {secret : process.env.JWT_KEY})
        await this.sellerModel.updateOne({_id : findSeller._id}, { token : token})
        return {token : token}

    }

    async logout(id) {
        await this.sellerModel.updateOne({ _id : id},{token : null})
        return { message : 'logout successfully' }
    }

    async findSeller(id : string) {
        const seller = this.sellerModel.findById(id)
        return seller
    }

    async updateSeller(id, updateSellerDto : UpdateSellerDto) {
        await this.sellerModel.updateOne({_id : id}, updateSellerDto)
        return {message : 'updated successfully'}
    }

    async deleteSeller(id) {
        await this.sellerModel.deleteOne(id)
        return { message : 'Delete seller successfully'}
    }
}
