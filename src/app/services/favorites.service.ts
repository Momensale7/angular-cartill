import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = `https://ecommerce.routemisr.com/api/v1/whishlist`;

  constructor(private _http: HttpClient) {}

  getFavorites(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  addFavorite(productId: string): Observable<any> {
    return this._http.post(`${this.apiUrl}`, { productId }); 
  }

  // removeFavorite(productId: string): Observable<any> {
  //   return this._http.delete(`${this.apiUrl}/${productId}`);
  // }
}
