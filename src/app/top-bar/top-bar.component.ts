import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit , OnDestroy{
    isCollapsed: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy(){

  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/