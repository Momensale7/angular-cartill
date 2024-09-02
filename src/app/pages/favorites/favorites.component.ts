import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { ProdCardComponent } from '../../shared/prod-card/prod-card.component';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ProdCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favorites: any[] = [];
  _favoritesService = inject(FavoritesService);
  router = inject(Router);

  constructor() {
    this._favoritesService.getFavorites().subscribe((res) => {
      this.favorites = res.data.favorites;
    });
  }

  addToFavorites(productId: string): void {
    console.log(productId);
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this._favoritesService.addFavorite(productId).subscribe({
        next: (res: any) => {
          console.log('Added to favorites:', res);
          // Optionally, update the favorites list in the component
          this.favorites.push(productId);
        },
        error: (err: any) => {
          console.error('Failed to add to favorites:', err);
        },
      });
    }
  }
}
