import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm! : FormGroup;
  users: User[] = []

  constructor(private service : UsersService, private route:Router) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = new FormGroup({
      name : new FormControl(),
      email : new FormControl(),
      pass : new FormControl(),
      repass : new FormControl(),
      birthdate : new FormControl(),
      gender : new FormControl()
    })
  }

  onSubmit(){
    let email = this.registerForm?.value.email
    if(!this.service.isExists(email)){
      let name = this.registerForm?.value.name
      let pass = this.registerForm?.value.pass
      let repass = this.registerForm?.value.repass
      let gender = this.registerForm?.value.gender
      let birthdate = this.registerForm?.value.birthdate
      let user : User = new User(name, email, pass, gender, birthdate)
      if(pass != repass){
        alert("Wrong Password!!!")
      }
      else{
        this.service.addUser(user).subscribe((data)=>{
          this.refreshUsers()
        })
        alert("new user")
        this.route.navigate(['profile/login'])
      }
    }
    else{
      alert("user exists")
    }
  }

  refreshUsers(){
    this.service.getUsers().subscribe((data)=>{
      this.users = data
    })
  }
}
