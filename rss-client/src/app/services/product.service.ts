import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../app-inventory/class/product/product';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Config } from 'protractor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = `${environment.inventoryServiceUrlWithZuul}/product`;

  constructor(private http: HttpClient) { }

  // CREATE
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product); // http://localhost:8989/product
  }

  // READ
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl); // http://localhost:8989/product
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/' + id); // http://localhost:8989/product/{id}
  }

  // UPDATE
  public updateProduct(product: Product) {
    return this.http.put<Product>(this.baseUrl, product); // http://localhost:8989/product
  }

  // DELETE
  deleteProductById(id: number): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + '/' + id); // http://localhost:8989/product/{id}
  }
}
