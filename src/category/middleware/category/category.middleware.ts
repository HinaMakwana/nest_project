import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    
    next();
  }
}
