import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  _type : string = ""
  
  constructor() { }

  ngOnInit(): void {
  }

  setType(type : string){
    this._type = type
  } 

}
