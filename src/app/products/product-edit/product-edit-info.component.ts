import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html',
})
export class ProductEditInfoComponent implements OnInit {
  // this grabs a reference from the template to the form to reset the form data on changes
  @ViewChild(NgForm, { static: false }) productForm: NgForm;

  errorMessage: string;
  product: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // data is shared across components using a reference to the same instance
    // subscribe here rerenders the page when the data from the parent changes
    this.route.parent.data.subscribe(
      (resolvedData) => {
        this.productForm?.reset();  // reset the form state on changes
        this.product = resolvedData.product.product;
      }
    );
  }
}
