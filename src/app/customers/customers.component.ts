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

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.displayMode = DISPLAY_MODE.CARD;
    this.getCustomersPage(1);
  }

  changeDisplayMode(mode) {
      this.displayMode = mode;
  }

  // pageChanged(page: number) {
  //   this.getCustomersPage(page);
  // }

  getCustomersPage(page: number) {
    // this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
    //     .subscribe((response: IPagedResults<ICustomer[]>) => {
    //       this.customers = this.filteredCustomers = response.results;
    //       this.totalRecords = response.totalRecords;
    //     },
    //     (err: any) => this.logger.log(err),
    //     () => this.logger.log('getCustomersPage() retrieved customers for page: ' + page));
    this.restService.getConfig()
      .subscribe((response : []) => {
        console.log('Data from config file',response);
        this.customers = this.filteredCustomers =response;
        this.totalRecords = response.length;
      });
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