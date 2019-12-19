import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressService } from 'src/service/progress.service';
import { finalize } from 'rxjs/operators';

export class ProgressInterceptor implements HttpInterceptor {
    constructor(public loaderService: ProgressService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.loaderService);
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
    }

}