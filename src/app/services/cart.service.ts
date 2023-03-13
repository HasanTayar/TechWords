import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../model/cart';
import { CartProduct } from '../model/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  removeFromCart(item: any) {
    throw new Error('Method not implemented.');
  }
  private carts: { [userId: string]: Cart } = {};
  baseUrl:string="http://localhost:3000/";
  headers={'content-type':'application/json'}
  constructor(private router:Router,private http: HttpClient){
    this.carts['anonymous']=new Cart();

   }
  
   getCurrentUserCart(): Cart {
    const userEmail = localStorage.getItem('user');
    if(userEmail===null){
      return this.carts['anonymous'];
    }
    let cart = this.carts[userEmail];
    if (!cart) {
      cart = new Cart;
      this.carts[userEmail] = cart;
      
    }
    return cart;
  }





  addProductToCart(product: CartProduct): void {
    
    const cart = this.getCurrentUserCart();
    let existingProduct = cart.products.find(p => p.product.title === product.product.title);
    if (existingProduct) {
        existingProduct.qty++;
        cart.totalPrice += product.product.price;
    } else {
        cart.products.push(product);
        cart.totalPrice += product.product.price;
    }
  }


  
  removeProductFromCart(product: CartProduct): void {
    
    const cart = this.getCurrentUserCart();
    const index = cart.products.indexOf(product);
    if (index > -1) {
      cart.products.splice(index, 1);
      cart.totalPrice -= product.product.price * product.qty;
    }
  }
  
  QuantityUp(product: CartProduct): void {
    const cart = this.getCurrentUserCart();
    const index = cart.products.indexOf(product);
    if (index > -1) {
      cart.products[index].qty += 1;
      cart.totalPrice += product.product.price;
     
    }
  }
  
  quantityDown(product: CartProduct): void {
    const cart = this.getCurrentUserCart();
    const index = cart.products.indexOf(product);
    if (index > -1) {
      cart.products[index].qty -= 1;
      cart.totalPrice -= product.product.price;
    }
  }
  
  getItems(): CartProduct[] {
    const cart = this.getCurrentUserCart();
    return cart.products;
  }
  
  gettotalprice(): number {
    const cart = this.getCurrentUserCart();
    return cart.totalPrice;
  }
  
  clearCart(): CartProduct[] {
    const cart = this.getCurrentUserCart();
    cart.products = [];
    cart.totalPrice = 0;
    return cart.products;
    
  }
 
  Payment(): void {
    const cart = this.getCurrentUserCart();
    const userEmail = localStorage.getItem('user');
    if (cart.user === null){
      alert("you must be logged in to make the payment");
      this.router.navigateByUrl('/profile/login'); // navigate the user to the login page
    } else if(userEmail) {

      alert("Payment Successful");
      cart.paid = true;
      this.saveCart().subscribe(); 
      this.clearCart();
    } 
  }
  saveCart(): Observable<any> {
    const currentUserCart = this.getCurrentUserCart();
    let body = JSON.stringify({ cart: currentUserCart });   
     let b = JSON.stringify(this.carts['products']);

    return this.http.post(this.baseUrl+'cart',body,{
      headers:this.headers
    })
  }
}