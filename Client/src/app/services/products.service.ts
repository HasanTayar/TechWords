import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl:string="http://localhost:5000/";
  headers={'content-type':'application/json'}

  constructor(private http: HttpClient){}

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl + 'products');
  }

  getProductsByType(type: string): Observable<any> {
    return this.http.get(this.baseUrl + 'products/type/' + type);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl + 'products/new', product, { headers: this.headers });
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(this.baseUrl + 'products/update' + product._id, product, { headers: this.headers });
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'products/delete' + productId);
  }
}
