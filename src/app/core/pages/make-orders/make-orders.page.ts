import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from './Product.model';
import { CartService } from './order-services/make-oders.service';
import { takeUntil } from 'rxjs/operators';
import { OrdersCartModalPage } from './cart-modal/cart-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-make-orders',
  templateUrl: './make-orders.page.html',
  styleUrls: ['./make-orders.page.scss'],
})
export class MakeOrdersPage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  public searchTerm = '';
  cart = [];
  cartItemCount = 0;
  products: IProduct[] = [];
  copyProduct: IProduct[] = [];
  isLoading = true;

  addedProducts: IProduct[] = [];

  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.onPopulateDummyData();
    this.cart = this.products;
    this.cartService
      .getCartItemCount()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((count) => {
        this.cartItemCount = count;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

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

  addToCart(product: IProduct) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: OrdersCartModalPage,
      cssClass: 'cart-modal',
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
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
