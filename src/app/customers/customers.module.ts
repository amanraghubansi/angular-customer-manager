import { NgModule } from '@angular/core';

// import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
// import { RestService } from '../rest.services';


@NgModule({
  imports: [CustomersRoutingModule],
  declarations: [CustomersRoutingModule.components],
  // providers :[RestService]
})
export class CustomersModule { }
