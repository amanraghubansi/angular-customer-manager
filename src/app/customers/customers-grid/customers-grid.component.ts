import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Customer } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'customers-grid-list',
  templateUrl: './customers-grid.component.html',
  styleUrls: ['./customers-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersGridComponent implements OnInit {

  @Input() customers: Customer[] = [];

  constructor() { }
  // private sorterService: SorterService

  ngOnInit() {

  }

  sort(prop: string) {
    // this.sorterService.sort(this.customers, prop);
  }

}
