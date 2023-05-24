import {
  Injectable,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestContext {
  requestIP: string;
  userAgent: string;
}
