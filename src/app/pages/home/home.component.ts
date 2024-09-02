import { MatPaginatorModule } from '@angular/material/paginator';

import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from './../../services/products.service';
import { Component, EventEmitter, Output, output } from '@angular/core';
import { ProdCardComponent } from '../../shared/prod-card/prod-card.component';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { LoaderComponent } from "../../shared/loader/loader.component";
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CategoryComponent } from '../../shared/category/category.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProdCardComponent, MatIconModule, SidebarComponent, MatPaginatorModule, LoaderComponent ,CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: any;
  filterdProducts: any;
  totalItems: any;
  pageSize = 10;
  currentPage = 0;

  onPageChange = new EventEmitter<number>();

  constructor(private _productsService: ProductsService,private _cart:CartService,private router:Router) {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data
      }
    });

  }

  getFilterProducts(filterProds: any) {
    this.filterdProducts = filterProds;
  }

  getItemsLenght(itemsLength: any) {
    this.totalItems = itemsLength;
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
  }



}
