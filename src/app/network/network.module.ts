import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { RestService } from './rest.services';
 
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RestService]
})
export class NetworkModule { }