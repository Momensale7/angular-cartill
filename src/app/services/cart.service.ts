import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private token: string | null = null;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private httpClient: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.token = localStorage.getItem('token');
    }
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'token': this.token || '' // Ensure headers don't break if token is null
    });
  }

  addToCart(productID: any): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: productID },
      { headers }
    );
  }

  getCart(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { headers }
    );
  }

  updateCart(productID: number, count: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      { count },
      { headers }
    );
  }

  removeItemCart(productID: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      { headers }
    );
  }

  deleteCart(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { headers }
    );
  }
}
