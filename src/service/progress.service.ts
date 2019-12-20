import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProgressService {
    isLoading = new Subject<boolean>();
    pool = [];
    show() {
        this.isLoading.next(this.pool.length > 0);
    }
    hide() {
        this.pool.pop();
        this.isLoading.next(this.pool.length > 0);
    }
}
