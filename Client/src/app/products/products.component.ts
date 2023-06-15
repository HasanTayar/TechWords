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
    this._type = type;
    if(this.type){
      this.productService.getProductsByType(this.type).subscribe(products => {
        this.products = products;
      });
    }
  }
  get type(): string { return this._type }

  constructor(private productService : ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  getTotalPrice(){
    return this.totalPrice;
  }

  addToCart(product: Product): void {
    this.cartService.addProductToCart(product).subscribe(() => {
      this.totalPrice += product.price;
    });
  }
}
