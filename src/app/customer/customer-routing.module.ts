import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

// import { CustomerComponent } from './customer.component';
// import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
// import { CustomerDetailsComponent } from './customer-details/customer-details.component';
// import { CustomerEditComponent } from './customer-edit/customer-edit.component';
// import { CanActivateGuard } from './guards/can-activate.guard';
// import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: 'details', component: CustomerDetailsComponent },
      {
        path: 'edit',
        component: CustomerEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {

}

