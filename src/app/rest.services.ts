import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class RestService {
    constructor(private http: HttpClient) { }

    configUrl = '../../data/customers.json';

    getConfig() {
        return this.http.get(this.configUrl);
    }
}