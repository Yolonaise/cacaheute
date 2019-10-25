import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from 'cacaheute-objects/models/cacaheute.user';
@Injectable()
export class CacaheuteClient {
    private baseUrl = 'https://tutonode.herokuapp.com';
    //private baseUrl = 'http://localhost:4201';
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

    async getUser(userId: string) {
        try {
            return await this.client.get<User>(`${this.baseUrl}/user/${userId}`, { ...this.getHeaders() }).toPromise();
        } catch (err) {
            return err.error ? err.error : err;
        }
    }
}
