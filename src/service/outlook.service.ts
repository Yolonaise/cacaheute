import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const config: AuthConfig = {
    issuer: 'https://login.microsoftonline.com/consumers/v2.0',
    redirectUri: `${window.location.origin}/dashboard`,
    clientId: '30b065cf-040e-4cb2-997a-b6ed4e3d9b7a',
    scope: 'openid',
    strictDiscoveryDocumentValidation: false,
    skipIssuerCheck: true,
    // dummyClientSecret: 'bm6DA?w-=ru85bm@Vag6-Igc9lDxTrq.',
};

const ACCESS_TOKEN = 'access_token';
const GRAPH_URL = 'https://graph.microsoft.com';

export class OutlookService {

    constructor(private oauth: OAuthService, private client: HttpClient, private cookie: CookieService) { }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.oauth.getAccessToken());

        return headers;

    }
    setAccessToken(token: string) {
        return this.cookie.set(ACCESS_TOKEN, token);
    }

    getAccessToken(): string {
        return this.cookie.get(ACCESS_TOKEN);
    }

    register() {
        try {
            this.oauth.initLoginFlow();
        } catch (err) {
            console.log(err);
        }
    }

    unRegister() {
        try {
            this.oauth.logOut();
        } catch (err) {
            console.log(err);
        }
    }
    configure() {
        this.oauth.configure(config);
        this.oauth.tokenValidationHandler = new JwksValidationHandler();
        this.oauth.loadDiscoveryDocumentAndTryLogin();
    }

    async getTasks(): Promise<any> {
        try {
            return await this.client.get(
                `${GRAPH_URL}/beta/me/outlook/tasks`,
                { headers: this.getHeaders() }).toPromise();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    public getIdentityClaims() {
        const claims = this.oauth.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims;
    }
}
