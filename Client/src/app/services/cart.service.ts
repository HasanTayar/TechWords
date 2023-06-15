import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = "http://localhost:3000/";
  headers = { 'content-type': 'application/json' }

  constructor(private router: Router, private http: HttpClient) { }

  getCurrentUserCart(): Observable<any> {
    const userEmail = localStorage.getItem('user');
    return this.http.get(`${this.baseUrl}carts/${userEmail}`, { headers: this.headers });
  }

  addProductToCart(product: any): Observable<any> {
    const userEmail = localStorage.getItem('user');
    return this.http.post(`${this.baseUrl}carts/${userEmail}/add`, product, { headers: this.headers });
  }

  removeProductFromCart(product: any): Observable<any> {
    const userEmail = localStorage.getItem('user');
    return this.http.post(`${this.baseUrl}carts/${userEmail}/remove`, product, { headers: this.headers });
  }

  updateProductQuantity(product: any, change: number): Observable<any> {
    const userEmail = localStorage.getItem('user');
    return this.http.put(`${this.baseUrl}carts/${userEmail}/updateQty`, { product, change }, { headers: this.headers });
  }

  getItems(): Observable<any> {
    const userEmail = localStorage.getItem('user');
    return this.http.get(`${this.baseUrl}carts/${userEmail}/items`, { headers: this.headers });
  }

  getTotalPrice(): Observable<any> {
    const userEmail = localStorage.getItem('user');
    return this.http.get(`${this.baseUrl}carts/${userEmail}/totalPrice`, { headers: this.headers });
  }

  clearCart(): Observable<any> {
    const userEmail = localStorage.getItem('user');
    return this.http.delete(`${this.baseUrl}carts/${userEmail}/clear`, { headers: this.headers });
  }

  Payment(): void {
    const userEmail = localStorage.getItem('user');
    if (userEmail === null) {
      alert("you must be logged in to make the payment");
      this.router.navigateByUrl('/login');
    } else {
      this.http.post(`${this.baseUrl}carts/${userEmail}/pay`, {}, { headers: this.headers }).subscribe(
        () => {
          alert("Payment Successful");
          this.clearCart().subscribe();
        },
        error => console.error(error)
      );
    }
  }
}
