import { HasTokenService } from './has-token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  constructor(private _http: HttpClient, private _hasToken: HasTokenService) { }

  register(data:any):Observable<any>{
    return this._http.post("https://ecommerce.routemisr.com/api/v1/auth/signup",data)
  }
  login(data:any):Observable<any>{
    return this._http.post("https://ecommerce.routemisr.com/api/v1/auth/signin",data)
  }
  changePass(data:any):Observable<any>{
    const token=localStorage.getItem('token')
    const headers = new HttpHeaders({
      'token':`${token}`,
    });
    return this._http.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",data,{ headers })
  }

  logOut() {
    localStorage.removeItem("token");
    this._hasToken.hasToken.next(false);
    this.router.navigate(["/home"])
  };
}
