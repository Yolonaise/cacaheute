import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CacaheuteClient {
    private baseUrl: string = 'https://tutonode.herokuapp.com';
    //private baseUrl: string = 'http://localhost:4201/server';
    private apikey: string = 'MainApp484369541';

    constructor(private client: HttpClient) { }

    private getHeaders() {
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'apiKey': this.apikey
          });
    }

    async getServerStatus() {
        let result = await this.client.options(`${this.baseUrl}/server`, { headers: this.getHeaders()}).toPromise();
        console.log(result);
        return result;
    }
}
