import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductListResolver implements Resolve<ProductListResolved> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    routeState: RouterStateSnapshot
  ): Observable<ProductListResolved> {
    // This might result in the filter not changing when navigated to, test
    const listFilter = route.queryParamMap.get('filterBy') || '';
    const showImage = route.queryParamMap.get('showImage') === 'true';

    return this.productService.getProducts().pipe(
      map((p: Product[]) => ({ products: p, showImage, listFilter })),
      catchError((e: Error) =>
        of({
          products: null,
          listFilter,
          showImage,
          error: `retrieval error: ${e}`,
        })
      )
    );
  }
}

export interface ProductListResolved {
  listFilter: string;
  showImage: boolean;
  products: Product[];
  error?: any;
}
