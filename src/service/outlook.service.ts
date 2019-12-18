import { UserAgentApplication } from 'msal';
import { ImplicitMSALAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider';
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import { Client } from '@microsoft/microsoft-graph-client/lib/src/Client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import { NotificationService } from './notification.service';

const msalConfig = {
    auth: {
        clientId: 'edbdc53a-acae-4b85-a3e5-f0b0e31ae04d',
        redirectUri: `${window.location.origin}/dashboard`,
    },
};
const graphScopes = ['user.read', 'tasks.read'];


export class OutlookService {
    private client: Client;

    constructor(private notif: NotificationService) {
        const msalApplication = new UserAgentApplication(msalConfig);
        const options = new MSALAuthenticationProviderOptions(graphScopes);
        const authProvider = new ImplicitMSALAuthenticationProvider(msalApplication, options);

        const options2 = {
            authProvider, // An instance created from previous step
        };
        this.client = Client.initWithMiddleware(options2);
    }

    async getMe(): Promise<MicrosoftGraphBeta.User | null> {
        try {
            return await this.client
                .api('/me')
                .version('beta')
                .get() as MicrosoftGraphBeta.User;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        }
    }

    async getTasks(): Promise<[MicrosoftGraphBeta.OutlookTask] | null> {
        try {
            const response = await this.client
                .api('/me/outlook/tasks')
                .version('beta')
                .get();
            return response.value;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        }
    }
}
