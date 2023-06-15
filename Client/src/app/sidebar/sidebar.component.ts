import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() typeChanged: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  changeToTablet(){
    this.typeChanged.emit('Tablet');
  }

  changeToMobile(){
    this.typeChanged.emit('Mobile');
  }

  changeToPc(){
    this.typeChanged.emit('Pc');
  }

}
