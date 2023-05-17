import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Model } from 'mongoose';
import { SELLER_MODEL, SellerDocument } from 'src/schemas/seller.schema';

@Injectable()
export class SellerMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(SELLER_MODEL)
    private  sellerModel : Model<SellerDocument>,
    private readonly jwtService : JwtService,
  ) {}
  async use(req: any, res: any, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const findToken = await this.sellerModel.findOne({token : token}, "+token")
      if(token === findToken.token){
        const decode = await this.jwtService.verify(token, { secret : process.env.JWT_KEY})
        req.sellerData = decode
        next();
      }
    } catch(err) {
      throw new UnauthorizedException({
        message : 'Auth fail',
        error : err ? 'Token invalid' : `${err}`
      })
    }
  }
}
