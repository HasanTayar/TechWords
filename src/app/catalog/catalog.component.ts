import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  type : string=""
  constructor() { }

  ngOnInit(): void {
  }
  typeChangedHandler(type:string){
    this.type = type;
  }

}
