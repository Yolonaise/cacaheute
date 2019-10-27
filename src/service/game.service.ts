import { CacaheuteClient } from 'src/client/cacaheute.client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from './nav.service';

export class GameService {
    public isLoading = false;
    public isConnected = false;

    constructor(private client: CacaheuteClient, private snackBar: MatSnackBar, public navService: NavigationService) { }

    async initialize(): Promise<any> {
        return await this.sendRequest(async () => {
            return await this.client.getServerStatus();
        });
    }

    async sendRequest(action: any): Promise<any> {
        this.isLoading = true;
        const result = await action();
        this.isLoading = false;

        return result;
    }

    showSnack(msg: string) {
        this.snackBar.open(msg, '', { duration: 1500 });
    }

    showActSnack(msg: string, actionTitle:string, action: any) {
        const ref = this.snackBar.open(msg, actionTitle);
        ref.onAction().subscribe(action());

        return ref;
    }
}
