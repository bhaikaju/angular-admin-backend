import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  getAllProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api/products');
  }

  deleteProduct(productId): Observable<any> {
    return this.httpClient.delete<{ message?: string, status: string }>(`http://localhost:3000/api/products/delete/${productId}`)
      .pipe(
        switchMap(async (data) => {
          const prods = await this.getAllProducts().toPromise();
          return {
            ...data,
            ...prods
          };
        })
      );
  }
}
