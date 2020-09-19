import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../messages/message.service';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  dataIsValid: { [key: string]: boolean } = {};
  pageTitle = 'Product Edit';
  errorMessage: string;

  private currentProduct: Product; // shared across components when editing
  private originalProduct: Product; // used to store the form's original state

  public get isDirty(): boolean {
    return (
      JSON.stringify(this.originalProduct) !==
      JSON.stringify(this.currentProduct)
    );
  }

  public get product(): Product {
    return this.currentProduct;
  }
  public set product(v: Product) {
    this.currentProduct = v;
    // keep a copy so any alterations are kept until the setter is called
    this.originalProduct = { ...v };
  }

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // observable instead of snapshot allows checking for changes
    this.route.data.subscribe((resolvedData) => {
      this.onProductRetrieved(resolvedData.product.product);
      this.errorMessage = resolvedData.product.error;
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product.productName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The new ${this.product.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The updated ${this.product.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();
    this.router.navigate(['/products']);
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every(
        (key) => this.dataIsValid[key] === true
      )
    );
  }

  // need to reset both current and original product after the save to prevent
  // guard activation on save
  reset(): void {
    this.dataIsValid = null;
    this.currentProduct = null;
    this.originalProduct = null;
  }

  validate(): void {
    // We validate separate from the form validation because you can't
    // use the form validation across children that don't share the template.

    // reset the validation object to prevent stateful errors
    this.dataIsValid = {};
    const p = this.product;
    this.dataIsValid.info =
      p.productName && p.productCode && p.productName.length >= 3;
    this.dataIsValid.tags = p.category && p.category.length >= 3;
  }
}
