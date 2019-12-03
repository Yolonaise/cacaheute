import { CacaheuteClient } from 'src/client/cacaheute.client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from './nav.service';

export class GameService {
    public isLoading = false;

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
}
