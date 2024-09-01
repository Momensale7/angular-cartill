import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
@Component({
  selector: 'app-shiping-address',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './shiping-address.component.html',
  styleUrl: './shiping-address.component.css'
})
export class ShipingAddressComponent {
  router = inject(Router);
  route =inject(ActivatedRoute)
  _payment=inject(PaymentService)
  errorMessage: string = "";
  isLoading: boolean = false;
  addressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
    city: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  },);

  payOnline(){
    const cartId = (this.route.snapshot.paramMap.get('id'));
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched()
    }
    else {
      this.errorMessage = "";
      this.isLoading = true;
      console.log(this.addressForm.value);
      console.log(cartId);
      this._payment.payOnline(cartId,this.addressForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          open(res.session.url,"_self")
          console.log(res);


        },
        error: (err: any) => {
          console.log(err);
          this.isLoading=false
        },
      })
    }
  }
}
