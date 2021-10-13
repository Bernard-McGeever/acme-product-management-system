import {Component, OnDestroy, OnInit} from "@angular/core";
import {Product} from "./product"
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  isImageShown = false;
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
    console.log('In setter: ', value);
  }
  filteredProducts : Product[] = [];
  products: Product[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService) {
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.isImageShown = !this.isImageShown;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    this.filteredProducts = this.products;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
