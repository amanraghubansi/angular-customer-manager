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

    insertCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.configUrl, customer)
            .pipe(catchError(this.handleError));
    }

    updateCustomer(customer: Customer): Observable<boolean> {
        return this.http.put(this.configUrl + '/' + customer.id, customer)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteCustomer(id: number) {
        //How to update to update in json file
        return this.http.get(this.configUrl)
        .pipe(
            map((response : Customer[]) => {
                let isDeleted : boolean = false;
                if(response){
                    for(let i=0;i<response.length;i++){
                        if(response[i].id === id){
                            response.splice(i,1);
                            isDeleted= true;
                            break;
                        }
                    }                
                }
                return isDeleted;
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