import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  users: User[] = []
  loggedIn: any
  public products: any[] = []
  items: any[] = []
  totalPrice: number = 0;

  constructor(private cartService : CartService, private router: Router, private userService: UsersService, private activeRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    const email = this.activeRoute.snapshot.params['email']
    this.loggedIn = this.users.find(user => user.email === email)

    forkJoin({
      items: this.cartService.getItems(),
      totalPrice: this.cartService.getTotalPrice()
    }).subscribe(results => {
      this.items = results.items;
      this.totalPrice = results.totalPrice;
    });
  }

  checkOut() {
    return this.cartService.Payment();
  }

  QuantityUp(product: any){
    this.cartService.updateProductQuantity(product, 1).subscribe(() => {
      this.updateCartData();
    });
  }

  removeItem(item: any){
    this.cartService.removeProductFromCart(item).subscribe(() => {
      this.updateCartData();
    });
  }

  quantityDown(product: any){
    if(product.qty == 1){
      this.deletefromcart(product);
      return;
    }
    this.cartService.updateProductQuantity(product, -1).subscribe(() => {
      this.updateCartData();
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.updateCartData();
    });
  }

  deletefromcart(product: any){
    this.cartService.removeProductFromCart(product).subscribe(() => {
      this.updateCartData();
    });
  }

  private updateCartData() {
    forkJoin({
      items: this.cartService.getItems(),
      totalPrice: this.cartService.getTotalPrice()
    }).subscribe(results => {
      this.items = results.items;
      this.totalPrice = results.totalPrice;
    });
  }
}
