import { AuthService } from './../../services/auth.service';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
function passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
  const password = formGroup.get('password')?.value;
  const rePassword = formGroup.get('rePassword')?.value;
  if (password && rePassword && password !== rePassword) {
    return { 'passwordMismatch': true };
  }
  return null ;
}
@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent {
  router = inject(Router);
  _authService=inject(AuthService)
  errorMessage: string = "";
  successMessage: string = "";
  isLoading: boolean = false;
  passForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}/)]),
    rePassword: new FormControl(null,[Validators.required]),
  }, { validators: passwordMatchValidator });

  changePass(){
    if (this.passForm.invalid) {
      this.passForm.markAllAsTouched()
    }
    else{
      this.errorMessage = "";
      this.successMessage = "";
      this.isLoading = true;
      this._authService.changePass(this.passForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.passForm.reset();
          this.isLoading = false;
          this.successMessage="password ubdated successfully"
          this.router.navigate(["/login"]);
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }
}
