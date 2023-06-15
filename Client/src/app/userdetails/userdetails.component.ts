import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  email: string = ""
  loggedin!:User;
  users: User[]=[]
  isMale: boolean = false
  
  constructor(private service:UsersService, private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.email = this.route.snapshot.params["mail"]
    
    this.service.getUsers().subscribe(data => {
      this.users = data
      
     let user = this.users.find(user => user.email == this.email)
      if(user != null){
        this.loggedin = user
        if (this.loggedin.gender === 'female') {
          this.isMale = false
        } else {
          this.isMale = true
        }
      }
    })
  }

}
