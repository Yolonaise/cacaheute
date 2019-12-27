import { UserAgentApplication } from 'msal';
import { ImplicitMSALAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider';
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import { Client } from '@microsoft/microsoft-graph-client/lib/src/Client';
import { OutlookTask, OutlookTaskFolder, User } from '@microsoft/microsoft-graph-types-beta';
import { NotificationService } from './notification.service';
import { ProgressService } from './progress.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IInit } from 'src/interfaces/init.interface';

const msalConfig = {
    auth: {
        clientId: 'edbdc53a-acae-4b85-a3e5-f0b0e31ae04d',
        redirectUri: `${window.location.origin}/dashboard`,
    },
};
const graphScopes = ['user.read', 'tasks.read', 'tasks.readwrite'];

@Injectable()
export class OutlookService implements IInit {
    isConnected = new BehaviorSubject<boolean>(false);
    currentUser: User;
    private client: Client;

    constructor(private notif: NotificationService, private progress: ProgressService) {
        const msalApplication = new UserAgentApplication(msalConfig);
        const options = new MSALAuthenticationProviderOptions(graphScopes);
        const authProvider = new ImplicitMSALAuthenticationProvider(msalApplication, options);

        const options2 = {
            authProvider, // An instance created from previous step
        };
        this.client = Client.initWithMiddleware(options2);
        this.isConnected.next(false);
    }

    async initialize() {
        await this.getMe();
    }

    async getMe(): Promise<User | null> {
        this.progress.show();
        try {
            const result = await this.client
                .api('/me')
                .version('beta')
                .get() as User;

            this.currentUser = result;
            this.isConnected.next(result !== null);
            return result;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        } finally {
            this.progress.hide();
        }
    }

    async getAllTasks(): Promise<[OutlookTask] | null> {
        this.progress.show();
        try {
            const response = await this.client
                .api(`/me/outlook/tasks`)
                .version('beta')
                .orderby('status')
                .filter(`status ne 'completed'`)
                .get();
            return response.value;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        } finally {
            this.progress.hide();
        }
    }

    async getTasks(folderId: string): Promise<[OutlookTask] | null> {
        this.progress.show();
        try {
            const response = await this.client
                .api(`/me/outlook/taskfolders('${folderId}')/tasks`)
                .version('beta')
                .orderby('status')
                .filter(`status ne 'completed'`)
                .get();
            return response.value;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        } finally {
            this.progress.hide();
        }
    }

    async getFolders(): Promise<[OutlookTaskFolder] | null> {
        this.progress.show();
        try {
            const response = await this.client
                .api('/me/outlook/taskfolders')
                .version('beta')
                .orderby('name')
                .get();
            return response.value;
        } catch (error) {
            this.notif.showSnack(error);
            return null;
        } finally {
            this.progress.hide();
        }
    }

    async completeTask(task: OutlookTask): Promise<OutlookTask | null> {
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
