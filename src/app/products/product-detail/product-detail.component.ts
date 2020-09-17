import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // I really don't like how the error is being handled on the course, feels hacky - Luis
    const resolvedData: ProductResolved = this.route.snapshot.data['product'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
