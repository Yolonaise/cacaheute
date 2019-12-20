import { NavigationService } from './nav.service';
import { CookieService } from 'ngx-cookie-service';
import { CacaheuteClient } from 'src/client/cacaheute.client';
import { Injectable } from '@angular/core';

const CURRENT_USER_ID = 'CurrentUserId';

@Injectable()
export class UserService {

    constructor(private nav: NavigationService, private cookie: CookieService, private client: CacaheuteClient) { }

    getStockedId(): string {
        return this.cookie.get(CURRENT_USER_ID);
    }

    setStockedId(userId: string) {
        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 7);
        this.cookie.set(CURRENT_USER_ID, userId, expiredDate);
    }

    async getUser(): Promise<any> {
        return await this.client.getUser(this.getStockedId());
    }
}
