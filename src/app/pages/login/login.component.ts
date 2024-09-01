import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HasTokenService } from '../../services/has-token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor (private _authService:AuthService,private _hasToken: HasTokenService){}
  router=inject(Router)
  errorMessage:string ="";
  isLoading:boolean=false;
loginForm :FormGroup =new FormGroup({
  email: new FormControl(null,[Validators.required]),
  password: new FormControl(null,[Validators.required]),
})

login(){
  if(this.loginForm.valid== false){
    this.loginForm.markAllAsTouched()
  }
  else{
    this.errorMessage =""
    this.isLoading=true
    this._authService.login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.token)
        this.loginForm.reset();
        this.isLoading=false
        this.router.navigate(["/home"])
        this._hasToken.hasToken.next(true);
      },
      error:(err:any)=>{
        console.log(err);
        this.errorMessage=err.error.message
        this.isLoading=false
      },
    })
  }

}
}
