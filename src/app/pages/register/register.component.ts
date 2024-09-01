import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';


function passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
  const password = formGroup.get('password')?.value;
  const rePassword = formGroup.get('rePassword')?.value;
  if (password && rePassword && password !== rePassword) {
    return { 'passwordMismatch': true };
  }
  return null ;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}/)]),
    rePassword: new FormControl(null,[Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)])
  }, { validators: passwordMatchValidator });

  constructor(private _authService: AuthService) {}

  register() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.errorMessage = "";
      this.isLoading = true;
      this._authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.registerForm.reset();
          this.isLoading = false;
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

  get passwordMismatch() {
    return this.registerForm.hasError('passwordMismatch') && this.registerForm.get('rePassword')?.touched;
  }
}
