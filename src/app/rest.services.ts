import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()

export class RestService {
    constructor(private http: HttpClient) { }

    configUrl = '../../data/customers.json';

    getConfig() {
        return this.http.get(this.configUrl);
    }
}