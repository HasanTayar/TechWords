import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from '../model/cart';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  _type : string =""
  products : Product[] = []
  totalPrice: number = 0
  @Input() set type(type: string) {
    
    this._type = type
      if(this.type == 'Tablet'){
       this.products = this.productService.getTabletProducts();
      }
      else if(this.type == 'Mobile'){
        this.products = this.productService.getMobileProducts();
      }
      else if(this.type == 'Pc'){
        this.products = this.productService.getPcProducts();
      }
    }
    get type(): string { return this._type }
  constructor(private productService : ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  getTotalPrice(){
    return this.totalPrice;
  }

  addToCart(product: Product): void {
    const cart = new CartProduct(product);
    this.cartService.addProductToCart(cart);
  }

}
