import { MatPaginatorModule } from '@angular/material/paginator';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatPaginatorModule, FormsModule, MatSliderModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  filterdProducts: any;
  categoriesNames: any;
  category!: string | null;
  searchTitle!: string
  searchPrice!: number;
  sortName: boolean = false;
  sortPriceAsc: boolean = false;
  sortPriceDesc: boolean = false;
  starsVal!: number;
  maxPrice!: number;
  clickedCategory: string | null = null;

  @Input() currentPage!: number;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 50;
  @Input() products!: any;

  @Output() filterProductsEvent = new EventEmitter<any>();
  @Output() itemsLengthEvent = new EventEmitter<any>();

  constructor(private _productsService: ProductsService) {
    this._productsService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesNames = res.data;
      }
    });

  }


  ngOnChanges(): void {
    if (this.products || this.currentPage) {
      this.applyFilteration();  // Call applyFilteration when products are updated Or user paginate to next Page
    }
  }




  applyFilteration() {
    let filterd = this.products

    // search by title
    if (this.searchTitle) {
      filterd = filterd.filter((prod: any) => prod.title.toLowerCase().includes(this.searchTitle.toLowerCase()));
    }

    // get products by category
    if (this.category) {
      filterd = filterd.filter((prod: any) => prod.category.name == this.category);
      console.log(filterd);
      console.log(this.category);
      this.clickedCategory = this.category;
    }


    // search by price
    if (this.searchPrice) {
      filterd = filterd.filter((prod: any) => prod.price < this.searchPrice)
    }


    // sort by price name
    if (this.sortName) {
      filterd = filterd.sort((a: any, b: any) => a.title.localeCompare(b.title));
    }

    // sort by price ascendig
    if (this.sortPriceAsc) {
      filterd = filterd.sort((a: any, b: any) => a.price - b.price);
    }

    // sort by price Descinding
    if (this.sortPriceDesc) {
      filterd = filterd.sort((a: any, b: any) => b.price - a.price);
    }

    // get products that max price == this
    if (this.maxPrice) {
      filterd = filterd.filter((prod: any) => prod.price <= this.maxPrice);
    }

    if (this.starsVal) {
      filterd = filterd.filter((prod: any) => prod.ratingsAverage >= this.starsVal);
    }

    // return the filtered 
    this.filterdProducts = filterd.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize)
    this.totalItems = filterd.length;
    console.log(filterd.length);
    this.itemsLengthEvent.emit(this.totalItems);
    this.filterProductsEvent.emit(this.filterdProducts);
  }


  getProductByCategory(category: string | null) {
    this.category = category;
    this.currentPage = 0;
    console.log(this.category);
    this.applyFilteration();
  }

  // onSearch(e: any) {
  //   let inputElement = e.target as HTMLInputElement;
  //   this.searchTitle = inputElement.value;
  //   this.applyFilteration();
  // }


  onSortName() {
    this.sortName = true;
    this.sortPriceAsc = false;
    this.sortPriceDesc = false;
    this.applyFilteration();
  }

  onSortPriceAsc() {
    this.sortPriceAsc = true;
    this.sortName = false;
    this.sortPriceDesc = false;
    this.applyFilteration();
  }

  onSortPriceDesc() {
    this.sortPriceDesc = true;
    this.sortName = false;
    this.sortPriceAsc = false;
    this.applyFilteration();
  }



  getStarsRate(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.starsVal = Number(inputElement.value);
    console.log(this.starsVal);
    this.applyFilteration();
  }

}
