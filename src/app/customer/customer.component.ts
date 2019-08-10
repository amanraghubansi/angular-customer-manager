import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DISPLAY_MODE } from '../constants/constants';

@Component({
  selector: 'cm-orders',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

    displayMode : string = null;
    displayModeTypes =  DISPLAY_MODE;

    constructor(private router: Router) { }

    ngOnInit() {
    }

}
