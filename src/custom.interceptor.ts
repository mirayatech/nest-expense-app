import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data) => {
        const repsonse = {
          ...data,
          createdAt: data.created_at,
        };
        delete repsonse.created_at;
        delete repsonse.updated_at;
        return repsonse;
      }),
    );
  }
}
