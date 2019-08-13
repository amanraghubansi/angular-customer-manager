import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer } from 'src/app/interfaces/interfaces';
import { RestService } from 'src/app/rest.services';
// import { ICustomer } from '../../shared/interfaces';
// import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'cm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer;
  mapEnabled: boolean;

  constructor(private route: ActivatedRoute, private restService: RestService) { }

  ngOnInit() {

    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.restService.getCustomer(id)
          .subscribe((customer: Customer) => {
            this.customer = customer;
            this.mapEnabled = true;
          });
      }
    });
  }


}
