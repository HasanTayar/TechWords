import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: User[] = []
  msg: string = ""
  loginForm !: FormGroup
  constructor(private usersService: UsersService, private route: ActivatedRoute, private router:Router) { } 

  ngOnInit(): void {
    this.createLoginForm()
    //this.users=this.usersService.getUsers()
  }
  

  onSubmit(){
    let mail = this.loginForm.value.email
    if(this.usersService.login(this.loginForm.value.email,this.loginForm.value.pass))
    {
      this.router.navigate(['/userdetails',mail]);
    }
    else
      alert("Wrong e-mail or password")
  }


  createLoginForm(){
    this.loginForm = new FormGroup(
      {
        email: new FormControl('' , [Validators.required]),
        pass: new FormControl('' , [Validators.required])
      }
    )
  }

}