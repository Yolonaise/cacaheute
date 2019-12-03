import { MatSnackBar } from '@angular/material/snack-bar';

export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    showSnack(msg: string) {
        this.snackBar.open(msg, '', { duration: 1500 });
    }

    showActSnack(msg: string, actionTitle: string, action: any) {
        const ref = this.snackBar.open(msg, actionTitle);
        ref.onAction().subscribe(action());

        return ref;
    }
}
