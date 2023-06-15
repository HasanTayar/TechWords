import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartProduct } from '../model/cart';
import { User } from '../model/user';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  users: User[] = []
  loggedIn: any
  public products: any[] = []
	items = this.cartService.getItems()
  totalPrice: number = this.cartService.gettotalprice();

  constructor(private cartService : CartService, private router: Router, private userService: UsersService, private activeRoute:ActivatedRoute) { }
	
  ngOnInit(): void {
    const email = this.activeRoute.snapshot.params['email']
    this.products = this.cartService.getItems()
    //this.users = this.userService.getUsers()
    this.loggedIn = this.users.find(user => user.email === email)
  }

  checkOut() {
    return this.cartService.Payment();
   }
  QuantityUp(product:CartProduct){
    this.cartService.QuantityUp(product);
    this.totalPrice+= product.product.price ;
  
  }
  
  
  removeItem(item: any){
    this.cartService.removeFromCart(item);
  }
  quantityDown(product:CartProduct){
    if(product.qty==1){
      this.deletefromcart(product);
      return;
    }
    this.cartService.quantityDown(product);
    this.totalPrice-= product.product.price ;
  
    }
  clearCart() {
    this.cartService.clearCart();
    this.items = this.cartService.getItems();
    this.totalPrice = 0;
  }
  deletefromcart(product: CartProduct){
    this.cartService.removeProductFromCart(product);
    this.totalPrice-=product.product.price*product.qty;
  }
  
}
