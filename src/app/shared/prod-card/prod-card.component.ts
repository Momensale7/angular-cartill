import { Component, inject, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-prod-card',
  standalone: true,
  imports: [NgForOf, RouterLink, MatIconModule],
  templateUrl: './prod-card.component.html',
  styleUrl: './prod-card.component.css'
})
export class ProdCardComponent {
  router = inject(Router);
  _cart=inject(CartService)
  @Input() products: any;

  getStarsCount(rate: number) {
    return new Array(Math.floor(rate));
  }


  goToDetails(id: number) {
    console.log(id);
    this.router.navigate(["product-details/", id])
  }
  add(productId: number): void {
    console.log(productId);
    const token = localStorage.getItem('token'); // Replace 'authToken' with your token key
    if (!token) {
      this.router.navigate(['/login']); // Navigate to login page if no token
    }
    else{
      this._cart.addToCart(productId).subscribe({
        next:(res:any)=>{
          console.log(res);
        },
        error:(err:any)=>{
          console.log(err);

        },
      })}
    }
}
