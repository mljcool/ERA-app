import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService, Product } from './cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from './cart-modal/cart-modal.page';
import { categories } from './constants/categories';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  private unsubscribeAll: Subject<any>;
  public searchTerm = '';
  cart = [];
  cartItemCount = 0;

  products: Product[] = [];
  copyProduct: Product[] = [];
  isLoading = true;

  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(private cartService: CartService, private modalCtrl: ModalController, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        this.cartService.getProducts(params.id)
          .subscribe(lisOfItems => {
            this.products = lisOfItems.map(item => {
              item.categoryByname = categories.find(
                cat => cat.value === item.category
              ).name;
              item.amount = 0;
              return item;
            });
            this.isLoading = false;
            this.copyProduct = this.products;
          });
      });


  }

  ngOnInit() {

    this.cart = this.cartService.getCart();
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copyShops = this.copyProduct.filter(service => {
        return service.name
          .toLowerCase()
          .includes(searchTerm);
      });
      this.products = [...copyShops];
    } else {
      console.log('here');
      this.products = this.copyProduct;
    }
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }

}

