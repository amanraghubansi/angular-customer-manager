import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/interfaces';
import { Observable ,of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class RestService {
    constructor(private http: HttpClient) { }

    configUrl = 'assets/data/customers.json';
    stateUrl = 'assets/data/states.json';

    paginationCurrentPage = 1;
    
    private customersList  = null;
    private stateList  = null;

    getConfig(page,pageSize) {
        if(this.customersList){
            return of({
                list : this.customersList.slice(page*pageSize,page*pageSize+pageSize),
                totalRecords : this.customersList.length
            });
        }
        return this.http.get(this.configUrl)
                .pipe(
                    map((resp)=>{
                        if(resp){
                            this.customersList = resp;
                        }
                        return {
                            list : this.customersList.slice(page*pageSize,page*pageSize+pageSize),
                            totalRecords : this.customersList.length
                        }
                    }),
                    catchError(this.handleError)
                )
    }

    getStates() {
        if(this.stateList){
            return of(this.stateList);
        }
        return this.http.get(this.stateUrl)
                .pipe(
                    map((resp)=>{
                        if(resp){
                            this.stateList = resp;
                        }
                        return resp;
                    }),
                    catchError(this.handleError)
                )
    }

    getCustomer(id: number): Observable<Customer> {
        if(this.customersList){
            return of(this.findCustomer(this.customersList,id));
        }

        return this.http.get(this.configUrl)
        .pipe(
            map((response : Customer[]) => {
                return this.findCustomer(response,id);
            }),
            catchError(this.handleError)
            );
        }

    private findCustomer(data,id){
        let customer = data.find((el)=>{
            if(el && el.id === id){ return el;}
        });
        return customer;
    }

    insertCustomer(customer: Customer): Observable<boolean> {
        customer.id = this.customersList.length+1;
        if(this.customersList){
            this.customersList.push(customer);
            return of(true);
        }
    }

    updateCustomer(customer: Customer): Observable<boolean> {
        if(this.customersList){
            let cust = this.findCustomer(this.customersList,customer.id);
            cust =  customer;
            return of(true);
        }
    }

    deleteCustomer(id: number) {
        if(this.customersList){
            for(let i=0;i<this.customersList.length;i++){
                if(this.customersList[i].id === id){
                    this.customersList.splice(i,1);
                    break;
                }
            }
            return of(true);
        }
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