import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

@NgModule({
  imports: [CustomerRoutingModule,AppCommonModule,FormsModule],
  declarations: [CustomerComponent,CustomerDetailsComponent,CustomerEditComponent]
})
export class CustomerModule { }
