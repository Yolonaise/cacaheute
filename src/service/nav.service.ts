import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
    constructor(private router: Router) { }

    goToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    gotToLogin() {
        this.router.navigate(['/login']);
    }
}
