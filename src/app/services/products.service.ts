import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  getProducts(){
    let Products :Product[] = [
      new Product("1","iPhone 14 Plus","/assets/images/iphone14p.jpg", 3700),
      new Product("2","Galaxy S22 Ultra", "/assets/images/s22u.jpg", 4700),
      new Product("3","Google Pixel 7", "/assets/images/pixel7.jpg", 2500),
      new Product("4","Nothing Phone (1)", "/assets/images/nothing.jpg", 1700),
      new Product("5","iPad Pro 11", "/assets/images/ipadpro.jpg", 4800),
      new Product("6","Galaxy Tab S8+", "/assets/images/tabs8.jpg", 3400),
      new Product("7","iPad mini", "/assets/images/ipadmini.jpg", 2000),
      new Product("8","Xiaomi Redmi Pad", "/assets/images/redmipad.jpg", 1800),
      new Product("9","MSI", "/assets/images/msi12.jpg", 4000),
      new Product("10","Asus ROG", "/assets/images/asusrog.jpg", 5000),
      new Product("11","Asus ROG Strix", "/assets/images/rogstrix.jpg", 4999),
      new Product("12","Lenovo Legion T5", "/assets/images/legion.jpg", 4500)
    ];
    return Products;
  }
  
  getPopular(){
    let Products :Product[] = [
      new Product("5","iPad Pro 11", "/assets/images/ipadpro.jpg", 4800),
      new Product("6","Galaxy Tab S8+", "/assets/images/tabs8.jpg", 3400),
      new Product("3","Google Pixel 7", "/assets/images/pixel7.jpg", 2500),
      new Product("11","Asus ROG Strix", "/assets/images/rogstrix.jpg", 4999),
      new Product("1","iPhone 14 Plus","/assets/images/iphone14p.jpg", 3700)
    ]
    return Products;
  }
  getTabletProducts(){
    let Products :Product[] = [
      new Product("5","iPad Pro 11", "/assets/images/ipadpro.jpg", 4800),
      new Product("6","Galaxy Tab S8+", "/assets/images/tabs8.jpg", 3400),
      new Product("7","iPad mini", "/assets/images/ipadmini.jpg", 2000),
      new Product("8","Xiaomi Redmi Pad", "/assets/images/redmipad.jpg", 1800)
    ];
    return Products;
  }
  getMobileProducts(){
    let Products :Product[] = [
      new Product("1","iPhone 14 Plus","/assets/images/iphone14p.jpg", 3700),
      new Product("2","Galaxy S22 Ultra", "/assets/images/s22u.jpg", 4700),
      new Product("3","Google Pixel 7", "/assets/images/pixel7.jpg", 2500),
      new Product("4","Nothing Phone (1)", "/assets/images/nothing.jpg", 1700)
    ];
    return Products;
  }
  getPcProducts(){
    let Products :Product[] = [
      new Product("9","MSI", "/assets/images/msi12.jpg", 4000),
      new Product("10","Asus ROG", "/assets/images/asusrog.jpg", 5000),
      new Product("11","Asus ROG Strix", "/assets/images/rogstrix.jpg", 4999),
      new Product("12","Lenovo Legion T5", "/assets/images/legion.jpg", 4500)
    ];
    return Products;
  }
}
