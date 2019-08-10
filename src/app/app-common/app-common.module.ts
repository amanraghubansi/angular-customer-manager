import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { MapComponent } from './map/map.component';
import { PaginationComponent } from './pagination/pagination.component';
 
@NgModule({
  imports: [CommonModule ],
  exports: [ CommonModule, CapitalizePipe,TrimPipe,MapComponent,PaginationComponent],
  declarations: [ CapitalizePipe,TrimPipe,MapComponent,PaginationComponent ]
})
export class AppCommonModule { }