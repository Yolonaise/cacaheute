import { NavigationService } from './nav.service';
import { CookieService } from 'ngx-cookie-service';
import { CacaheuteClient } from 'src/client/cacaheute.client';

const CURRENT_USER_ID = 'CurrentUserId';

export class UserService {

    constructor(private nav: NavigationService, private cookie: CookieService, private client: CacaheuteClient) { }

    getStockedId(): string {
        return this.cookie.get(CURRENT_USER_ID);
    }

    setStockedId(userId: string) {
        this.cookie.set(CURRENT_USER_ID, userId);
    }

    async getUser(): Promise<any> {
        return await this.client.getUser(this.getStockedId());
    }
}
