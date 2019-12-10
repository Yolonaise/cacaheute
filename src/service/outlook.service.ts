import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';

const config: AuthConfig = {
    issuer: 'https://login.microsoftonline.com/f9a4f4a4-b102-47b6-9f8c-5b0c23a1a20f/v2.0',
    redirectUri: `${window.location.origin}/dashboard`,
    clientId: '30b065cf-040e-4cb2-997a-b6ed4e3d9b7a',
    scope: 'openid',
    strictDiscoveryDocumentValidation: false,
    // dummyClientSecret: 'bm6DA?w-=ru85bm@Vag6-Igc9lDxTrq.',
};

const ACCESS_TOKEN = 'access_token';
export class OutlookService {

    constructor(private oauth: OAuthService, private cookie: CookieService) { }

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
        try {
            this.oauth.configure(config);
            this.oauth.tokenValidationHandler = new JwksValidationHandler();
            this.oauth.loadDiscoveryDocumentAndTryLogin();
        } catch (err) {
            console.log(err);
        }
    }

    connect() {
        this.oauth.getAccessToken();
    }

    public getIdentityClaims() {
        const claims = this.oauth.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims;
    }
}
