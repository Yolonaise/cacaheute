import { Router } from '@angular/router';

export class NavigationService {
    constructor(private router: Router) { }

    goToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    gotToLogin() {
        this.router.navigate(['/login']);
    }
}
