import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class RestService {
    constructor(private http: HttpClient) { }

    configUrl = 'assets/data/customers.json';

    getConfig() {
        return this.http.get(this.configUrl);
    }

    getCustomer(id: number): Observable<Customer> {
        return this.http.get(this.configUrl)
            .pipe(
                map(response => {
                    let customer = response.find(function(el){
                        if(el && el.id === id){ return el;}
                    });
                    return customer;
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }
}