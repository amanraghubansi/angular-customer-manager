import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers.component';
// import { CustomersCardComponent } from './customers-card/customers-card.component';
// import { CustomersGridComponent } from './customers-grid/customers-grid.component';
import { RestService } from '../rest.services';

const routes: Routes = [
  { path: '', component: CustomersComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  // providers :[RestService]
})
export class CustomersRoutingModule {
  // static components = [ CustomersComponent, CustomersCardComponent, CustomersGridComponent ];
  static components = [ CustomersComponent];
}
