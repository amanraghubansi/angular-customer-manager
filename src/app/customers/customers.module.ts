import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomersCardComponent } from './customers-card/customers-card.component';
import { CustomersGridComponent } from './customers-grid/customers-grid.component';
import { AppCommonModule } from '../app-common/app-common.module';


@NgModule({
  imports: [CustomersRoutingModule,CommonModule,AppCommonModule],
  declarations: [ CustomersComponent, CustomersCardComponent, CustomersGridComponent ]
})
export class CustomersModule { }
