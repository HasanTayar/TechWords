import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UsersService) { }
login:string="Login";
  ngOnInit(): void {
  }
checkLogin(){
  if(this.userService.currentUser != ""){
    this.login ="Logout"
  }
}
}
