import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL: string = 'http://localhost:3000/';
  headers = {'content-type':'application/json'};

  currentUser: string = ""
  users : User[] =[]
  constructor(private router: Router, private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL + 'users').pipe(
      catchError(this.handleError)
    );
  }

  isExists(mail : String){
    for(let user of this.users){
      if(mail == user.email)
        return true
    }
    return false
  }

  addUser(user: User): Observable<any> {
    let body = JSON.stringify(user)
    return this.http.post(this.apiURL + 'users', body, {
      headers: this.headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiURL + 'users')
      .pipe(
        map(users => {
          const user = users.find(user => user.email === email && user.password === password);
          if (user) {
            try {
              localStorage.setItem('user', email);
            } catch (error) {
              console.error(error);
            }
            return true;
          } else {
            return false;
          }
        }),
        switchMap(isValidLogin => {
          if (isValidLogin) {
            this.currentUser = email;
            this.router.navigate(['/profile']);
            return of(true);
          } else {
            return of(false);
          }
        }),
      );
  }
 
 
  logout(): Promise<void> {
    this.currentUser = "";
    localStorage.removeItem('user');
    return Promise.resolve();
  }

  
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
