import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import User from 'cacaheute-objects/models/cacaheute.user';
@Injectable()
export class CacaheuteClient {
    private baseUrl = 'https://tutonode.herokuapp.com';
    private apikey = 'MainApp484369541';

    constructor(private client: HttpClient) { }

    private getHeaders() {
        return {
            headers: {
                apikey: 'MainApp484369541'
            }
        };
    }

    async getServerStatus() {
        try {
            return await this.client.get(`${this.baseUrl}/server`, { ...this.getHeaders() }).toPromise();
        } catch (err) {
            return err.error ? err.error : err;
        }
    }

    async enterIn(email: string, name: string) {
        try {
            return await this.client.post<User>(`${this.baseUrl}/user/enterin`, {},
                {
                    ...this.getHeaders(),
                    params: new HttpParams().set('email', email).set('name', name)
                }).toPromise();
        } catch (err) {
            return err.error ? err.error : err;
        }
    }

    async getUser(userId: string) {
        try {
            return await this.client.get<User>(`${this.baseUrl}/user/${userId}`, { ...this.getHeaders() }).toPromise();
        } catch (err) {
            return err.error ? err.error : err;
        }
    }

    async getGames(userId: string) {
        try {
            return await this.client.get<User>(`${this.baseUrl}/game/byUser/${userId}`, { ...this.getHeaders() }).toPromise();
        } catch (err) {
            return err.error ? err.error : err;
        }
    }
}
