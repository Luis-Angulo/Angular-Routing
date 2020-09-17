import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    routeState: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const pid = +route.paramMap.get('id');
    if (isNaN(pid)) {
      return of({ product: null, error: `ProductId ${pid} is not a number` });
    }

    return this.productService.getProduct(pid).pipe(
      map((p: Product) => ({ product: p })),
      catchError((e: Error) =>
        of({ product: null, error: `retrieval error: ${e}` })
      )
    );
  }
}
