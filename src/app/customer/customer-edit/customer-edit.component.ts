import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Customer, State } from 'src/app/interfaces/interfaces';
import { RestService } from 'src/app/network/rest.services';

// import { DataService } from '../../core/services/data.service';
// import { ModalService, IModalContent } from '../../core/modal/modal.service';
// import { ICustomer, IState } from '../../shared/interfaces';
// import { GrowlerService, GrowlerMessageType } from '../../core/growler/growler.service';
// import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'cm-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer: Customer =
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      }
    };
  states: State[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  @ViewChild('customerForm', { static: true }) customerForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getCustomer(id);
      }
    });

    this.restService.getStates().subscribe((states: State[]) => {
      this.states = states;
    });
  }

  getCustomer(id: number) {
    this.restService.getCustomer(id).subscribe((customer: Customer) => {
      this.customer = customer;
    });
  }

  submit() {
    if (this.customer.id === 0) {
      this.restService.insertCustomer(this.customer)
        .subscribe((status) => {
          if (status) {
            alert("Cusotmer added successfully");
            this.router.navigate(['/customers']);
          } else {
            this.errorMessage = 'Unable to insert customer,Please try again.';
          }
        },
        (err: any) => console.log('Error Occured'));
    } else {
      this.restService.updateCustomer(this.customer)
        .subscribe((status) => {
          if (status) {
            alert("Cusotmer info updated successfully");
            this.router.navigate(['/customers']);
          } else {
            this.errorMessage = 'Unable to update customer,Please try again.';
          }
        },
        (err: any) => console.log('Error Occured'));
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/customers']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.restService.deleteCustomer(this.customer.id)
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate(['/customers']);
        } else {
          this.errorMessage = 'Unable to delete customer';
        }
      },
      (err: any) => console.log('Error Occured'));
  }

}
