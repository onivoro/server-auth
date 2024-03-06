import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { authorizeRequest } from '../functions/authorize-request.function';

export abstract class AbstractAuthGuard<TAccessToken> implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return authorizeRequest<TAccessToken>(context, (token, request) => this.evaluateToken(token, request));
  };

  abstract evaluateToken: (token?: TAccessToken, request?: any) => boolean;
}
