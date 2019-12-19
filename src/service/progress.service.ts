import { Subject } from 'rxjs';

export class ProgressService {
    isLoading = new Subject<boolean>();
    pool = [];
    show() {
        console.log('is loading');
        this.pool.push('yolonaise');
        this.isLoading.next(this.pool.length > 0);
    }
    hide() {
        console.log('has ended loading');
        this.pool.pop();
        this.isLoading.next(this.pool.length > 0);
    }
}