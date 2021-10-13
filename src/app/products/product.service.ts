import {Injectable} from "@angular/core";
import {Product} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json'

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap(data => console.log('ALL', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id : number) : Observable<Product | undefined> {
    return this.getProducts().pipe(map((products: Product[]) => products.find(p => p.productId === id)));
  }

  handleError(err: HttpErrorResponse) {
    let errMessage = '';
    if (err.error instanceof ErrorEvent) {
      errMessage = `An error occcured: ${err.error.message}`;
    } else {
      errMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errMessage);
    return throwError(errMessage);
  }
}
