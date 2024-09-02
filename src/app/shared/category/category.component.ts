import { Component, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductsService } from '../../services/products.service';
interface category {
  categoryName:string,
  categoryImage:string,
}
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  host: { ngSkipHydration: 'true' }
})
export class CategoryComponent {
  _category=inject(ProductsService)

  categories:any={}
  ngOnInit(): void {
    this.loadCat();
    console.log(this.loadCat);

  }
  private loadCat() {
    this._category.getAllCategories().subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

responsiveOptions = [
  {
      breakpoint: '1199px',
      numVisible: 7,
      numScroll: 1
  },
  {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
  }
];
}
