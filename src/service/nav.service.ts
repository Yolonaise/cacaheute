import { Router } from '@angular/router';

export class NavigationService {
    constructor(private router: Router) { }

    goToDashboard(userId: string) {
        this.router.navigate([`/dashboard/${userId}`]);
    }
}
