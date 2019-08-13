import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Customer } from '../../interfaces/interfaces';

@Component({
  selector: 'customers-card-list',
  templateUrl: './customers-card.component.html',
  styleUrls: [ './customers-card.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersCardComponent implements OnInit {

  @Input() customers: Customer[] = [];

  constructor() { }

  ngOnInit() {

  }

}

