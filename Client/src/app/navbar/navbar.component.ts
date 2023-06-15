import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<string>;

  constructor(public userService: UsersService) { 
    this.currentUser$ = this.userService.currentUser.asObservable();
  }

  ngOnInit(): void {
  }
}
