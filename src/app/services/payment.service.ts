import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  _httpclient=inject(HttpClient)

  constructor() { }
  token=localStorage.getItem('token')
  payOnline(cartId:any,address:{}):Observable<any>{
    const headers = new HttpHeaders({
      'token':`${this.token}`,
    });
    return this._httpclient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://angular-cartil-1mji.vercel.app`,{ "shippingAddress":address },{headers})
  }
}
