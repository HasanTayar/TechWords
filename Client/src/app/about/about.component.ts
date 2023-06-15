import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }
  container = "light";
  isLight = true;

  ngOnInit(): void {
  }

  switch(){
    this.isLight = !this.isLight;
    if(this.isLight)
      this.container="light";
    else
      this.container="dark";
  }

}
