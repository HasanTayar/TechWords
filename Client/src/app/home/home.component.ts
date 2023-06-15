import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "popular products"
  products : Product[] = []
  
  constructor(private productService : ProductsService, private cartService: CartService) { }

  ngOnInit(): void {

  }

  // addToCart(product: Product): void {
  //   this.cartService.addToCart(product)
  // }
}