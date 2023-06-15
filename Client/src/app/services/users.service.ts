import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL: string = 'http://localhost:5000/users';
  headers = {'content-type':'application/json'};

  currentUser: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('user') || "");
  users : User[] =[]
  
  constructor(private router: Router, private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/get-users`).pipe(
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
    return this.http.post(`${this.apiURL}/register`, body, {
      headers: this.headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<User[]>(`${this.apiURL}/login`, {email, password}, {
      headers: this.headers
    })
      .pipe(
        map(user => {
          if (user) {
            try {
              localStorage.setItem('user', email);
              this.currentUser.next(email);
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
            this.currentUser.next(email);
            this.router.navigate(['/profile']);
            return of(true);
          } else {
            return of(false);
          }
        }),
        catchError(this.handleError)
      )
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.next("");
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
