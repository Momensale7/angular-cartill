import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { count } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  userCart:any={}
_cart=inject(CartService)
removingProduct: any;
ngOnInit(): void {
  this.loadCart();
  console.log(this.userCart);

}

private loadCart() {
  this._cart.getCart().subscribe({
    next: (res: any) => {
      console.log(res);
      this.userCart = res;
    },
    error: (err: any) => {
      console.log(err);
    },
  });
}
updateCart:any= (productId,count)=> this._cart.updateCart(productId,count).subscribe({
  next:(res:any)=>{
    console.log(res);
    console.log(count);
    this.loadCart();
  },
  error:(err:any)=>{
    console.log(err);
  },
})
setremovingProduct(productId: any) {
  this.removingProduct = productId;
}

removeItem = () => {
  if (this.removingProduct) {
    this._cart.removeItemCart(this.removingProduct).subscribe({
      next: (res: any) => {
        console.log('Item deleted:', res);
        this.loadCart();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
deleteCart:any= ()=> this._cart.deleteCart().subscribe({
  next:(res:any)=>{
    console.log(res);
    this.userCart={}
  },
  error:(err:any)=>{
    console.log(err);
  },
})
handleUpdate(productId:number,count:number):void{
  if (count==0){
    this.removeItem()
  }
  else{
    this.updateCart(productId, count)
  }
}
}
