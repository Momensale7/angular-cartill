import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _httpclient=inject(HttpClient)
  constructor() {}
  token=localStorage.getItem('token')
  addToCart(productID:any):Observable<any>{
      const headers = new HttpHeaders({
        'token':`${this.token}`,
      });
      return this._httpclient.post("https://ecommerce.routemisr.com/api/v1/cart",{ productId:productID },{headers})
    }
  getCart():Observable<any>{
      const headers = new HttpHeaders({
        'token':`${this.token}`,
      });
      return this._httpclient.get("https://ecommerce.routemisr.com/api/v1/cart",{headers})
    }
  updateCart(productID:number,count:number):Observable<any>{
      const headers = new HttpHeaders({
        'token':`${this.token}`,
      });
      return this._httpclient.put("https://ecommerce.routemisr.com/api/v1/cart/"+productID,{count:count},{headers})
    }
  removeItemCart(productID:number):Observable<any>{
      const headers = new HttpHeaders({
        'token':`${this.token}`,
      });
      return this._httpclient.delete("https://ecommerce.routemisr.com/api/v1/cart/"+productID,{headers})
    }
  deleteCart():Observable<any>{
      const headers = new HttpHeaders({
        'token':`${this.token}`,
      });
      return this._httpclient.delete("https://ecommerce.routemisr.com/api/v1/cart/",{headers})
    }

}
