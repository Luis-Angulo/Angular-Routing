import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './product-resolver';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { FormsModule } from '@angular/forms';
import { ProductListResolver } from './product-list-resolver';
import { AuthGuard } from '../user/auth.guard';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'products',
        // child routes are relative to parent path
        canActivate: [AuthGuard],
        children: [
          // these will render on the first (outer) outlet
          { path: '', component: ProductListComponent, resolve: {products: ProductListResolver} },
          {
            path: ':id',
            component: ProductDetailComponent,
            resolve: { product: ProductResolver },
          },
          {
            path: ':id/edit',
            component: ProductEditComponent,
            resolve: { product: ProductResolver },
            // these will render on the second (inner) outlet
            children: [
              { path: '', redirectTo: 'info', pathMatch: 'full' },
              { path: 'info', component: ProductEditInfoComponent },
              { path: 'tags', component: ProductEditTagsComponent },
            ],
          },
        ],
      },
    ]),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
  ],
})
export class ProductModule {}
