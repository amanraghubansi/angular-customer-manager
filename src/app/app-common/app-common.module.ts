import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
 
@NgModule({
  imports: [CommonModule ],
  exports: [ CommonModule, CapitalizePipe,TrimPipe ],
  declarations: [ CapitalizePipe,TrimPipe ]
})
export class AppCommonModule { }