import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Model } from 'mongoose';
import { USER_MODEL, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(USER_MODEL)
    private  userModel : Model<UserDocument>,
    private readonly jwtService : JwtService,
  ) {}
  async use(req: any, res: any, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const findToken = await this.userModel.findOne({token : token}, "+token")
      if(token === findToken.token){
        const decode = await this.jwtService.verify(token, { secret : process.env.JWT_KEY})
        req.userData = decode
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
