import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Model } from 'mongoose';
import { ADMIN_MODEL, AdminDocument } from 'src/schemas/admin.schema';

@Injectable()
export class AdminsMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(ADMIN_MODEL)
    private  adminModel : Model<AdminDocument>,
    private readonly jwtService : JwtService,
  ) {}

  async use(req: any, res: any, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const findToken = await this.adminModel.findOne({token : token}, '+token')
      if(token === findToken.token){
        const decode = await this.jwtService.verify(token, { secret : process.env.JWT_KEY})
        req.adminData = decode
        next();
      }
    } catch(err) {
      throw new UnauthorizedException({
        message : 'Auth fail',
        error : err ? `${err}` : 'Invalid token'
      })
    }
  }
}
