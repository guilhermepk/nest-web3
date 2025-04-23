import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();
        response.setHeader('X-Custom', 'Item customizado no header através do interceptor');
        return next.handle().pipe(
            tap(() => {
                console.log(JSON.stringify(response.getHeaders()));
            })
        );
    }

}