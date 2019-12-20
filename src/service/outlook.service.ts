import { UserAgentApplication } from 'msal';
import { ImplicitMSALAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider';
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import { Client } from '@microsoft/microsoft-graph-client/lib/src/Client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import { NotificationService } from './notification.service';
import { ProgressService } from './progress.service';
import { Injectable } from '@angular/core';

const msalConfig = {
    auth: {
        clientId: 'edbdc53a-acae-4b85-a3e5-f0b0e31ae04d',
        redirectUri: `${window.location.origin}/dashboard`,
    },
};
const graphScopes = ['user.read', 'tasks.read', 'tasks.readwrite'];

@Injectable()
export class OutlookService {
    private isConnected: boolean;
    private client: Client;

    constructor(private notif: NotificationService, private progress: ProgressService) {
        const msalApplication = new UserAgentApplication(msalConfig);
        const options = new MSALAuthenticationProviderOptions(graphScopes);
        const authProvider = new ImplicitMSALAuthenticationProvider(msalApplication, options);

        const options2 = {
            authProvider, // An instance created from previous step
        };
        this.client = Client.initWithMiddleware(options2);
        this.isConnected = false;
    }

    async getMe(): Promise<MicrosoftGraphBeta.User | null> {
        this.progress.show();
        try {
            const result = await this.client
                .api('/me')
                .version('beta')
                .get() as MicrosoftGraphBeta.User;

            this.isConnected = result !== null;
            return result;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        } finally {
            this.progress.hide();
        }
    }

    async getTasks(): Promise<[MicrosoftGraphBeta.OutlookTask] | null> {
        this.progress.show();
        try {
            const response = await this.client
                .api('/me/outlook/tasks')
                .version('beta')
                .get();
            return response.value;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        } finally {
            this.progress.hide();
        }
    }

    async completeTask(task: MicrosoftGraphBeta.OutlookTask): Promise<MicrosoftGraphBeta.OutlookTask | null> {
        this.progress.show();
        try {
            const response = await this.client
                .api(`/me/outlook/tasks/${task.id}/complete`)
                .version('beta')
                .post({});
            return response.value[0];
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        } finally {
            this.progress.hide();
        }
    }
}
