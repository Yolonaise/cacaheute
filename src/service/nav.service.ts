import { Router } from '@angular/router';

export class NavigationService {
    constructor(private router: Router) { }

    goToDashboard() {
        this.router.navigate(['/dashboard']);
    }
}
