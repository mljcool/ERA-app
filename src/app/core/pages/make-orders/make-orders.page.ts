import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from './Product.model';

@Component({
  selector: 'app-make-orders',
  templateUrl: './make-orders.page.html',
  styleUrls: ['./make-orders.page.scss'],
})
export class MakeOrdersPage implements OnInit {
  private unsubscribeAll: Subject<any>;
  public searchTerm = '';
  cart = [];
  cartItemCount = 0;
  products: IProduct[] = [];
  copyProduct: IProduct[] = [];
  isLoading = true;

  addedProducts: IProduct[] = [];

  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor() {
    this.onPopulateDummyData();
  }

  ngOnInit() { }

  onPopulateDummyData() {
    for (let index = 0; index < 10; index++) {
      this.products.push({
        id: (index + 1).toString(),
        amount: 1000,
        name: 'Sample',
        price: 2000,
        quantity: 1,
        uid: '12312312',
        categoryByname: 'Sample Product',
      });
    }
  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copyShops = this.copyProduct.filter((service) => {
        return service.name.toLowerCase().includes(searchTerm);
      });
      this.products = [...copyShops];
    } else {
      console.log('here');
      this.products = this.copyProduct;
    }
  }

  openCart(): void { }

  addToCart(product: IProduct) {
    const findProdID = this.addedProducts.some(
      (element) => element.id === product.id
    );
    this.animateCSS('tada');
    if (findProdID) {
      this.addedProducts = this.addedProducts.map((element) => {
        if (element.id === product.id) {
          element.quantity += 1;
        }
        return element;
      });
      this.getTotalQTY();
      return;
    }

    this.addedProducts.push(product);
    this.getTotalQTY();

  }

  getTotalQTY() {
    const sum = this.addedProducts
      .map(item => item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    this.cartItemCount = sum;
  }


  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }
}
