import { Component, OnInit } from '@angular/core';
import { RestService } from '../network/rest.services';
import { DISPLAY_MODE } from '../constants/constants';
import { Customer } from '../interfaces/interfaces';
// import { DataService } from '../core/services/data.service';
// import { ICustomer, IPagedResults } from '../shared/interfaces';
// import { FilterService } from '../core/services/filter.service';
// import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'cm-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  customers: Customer[] = [];
  filteredCustomers: any[] = [];
  totalRecords = 0;
  pageSize = 10;
  displayMode : string = null;
  displayModeTypes =  DISPLAY_MODE;
  paginationCurrentPage:number;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.displayMode = DISPLAY_MODE.CARD;
    this.paginationCurrentPage = this.restService.paginationCurrentPage;
    this.getCustomersPage(this.paginationCurrentPage);
  }

  changeDisplayMode(mode) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.paginationCurrentPage = this.restService.paginationCurrentPage = page;
    this.getCustomersPage(page);
  }

  getCustomersPage(page: number) {
    this.restService.getConfig(page-1,this.pageSize)
      .subscribe((response : any) => {
        this.calculateOrderTotal(response.list);
        this.customers = this.filteredCustomers =response.list;
        this.totalRecords = response.totalRecords;
      });
  }

  calculateOrderTotal(customers: Customer[]) {
    for (const customer of customers) {
        let total = 0;
        if (customer && customer.orders) {    
            for (const order of customer.orders) {
                total += order.itemCost;
            }
        }
        customer.orderTotal = total;
    }
}

  filterChanged(data: string) {
    if (data && this.customers) {
        data = data.toUpperCase();
        const props = ['firstName', 'lastName', 'city', 'state.name'];
        // this.filteredCustomers = this.filterService.filter<ICustomer>(this.customers, data, props);
        this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers;
    }
  }
}