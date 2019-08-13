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