import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    if(request.userData.status == 'ACTIVE') {
      return true;
    }
    else {
      throw new UnauthorizedException({
        message : `User is ${request.userData.status}`,
        error : 'User is Unauthorized'
      })
    }
  }
}
