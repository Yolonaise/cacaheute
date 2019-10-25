import { Injectable } from '@angular/core';
import { CacaheuteClient } from 'src/client/cacaheute.client';

export class GameService {
    public isLoading = false;

    constructor(@Injectable() private client: CacaheuteClient) { }

    async initialize(): Promise<any> {
        return await this.sendRequest(async () => {
            return await this.client.getServerStatus();
        });
    }

    private async sendRequest(action: any): Promise<any> {
        this.isLoading = true;
        const result = await action();
        this.isLoading = false;

        return result;
    }
}
