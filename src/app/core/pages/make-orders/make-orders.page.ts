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
import {
  ModalController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { getShopProducts } from '../../configs/firebaseRef/ShopProductsCore';

@Component({
  selector: 'app-make-orders',
  templateUrl: './make-orders.page.html',
  styleUrls: ['./make-orders.page.scss'],
})
export class MakeOrdersPage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  public searchTerm = '';
  cart = [];
  products: any[] = [];
  copyProduct: any[] = [];
  addedProducts: any[] = [];
  cartItemCount = 0;
  isLoading = true;
  shopId: string = '';
  tempCart: any[] = [];

  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.cart = this.products;
    this.cartService
      .getCartItemCount()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((count) => {
        this.cartItemCount = count;
      });
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { shopId } = params;
        this.shopId = shopId;
        this.onPopulateCartItems(shopId);
      });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Your cart!',
      message: 'Would you like to save it for later?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['./discover-shops']);
            this.cartService.cart = [];
            this.tempCart = [];
            this.cartItemCount = 0;
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onBack() {
    if (this.cartService.getCart().length >= 1) {
      this.presentAlertConfirm();
      return;
    }
    this.router.navigate(['./discover-shops']);
  }

  onPopulateCartItems(shopId) {
    getShopProducts(shopId).onSnapshot((snapshot) => {
      this.products = snapshot.docs.map((users) => ({
        key: users.id,
        ...users.data(),
      }));
      console.log('make-order', this.products);
    });
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
      this.products = this.copyProduct;
    }
  }

  addToCart(product: IProduct) {
    console.log('product', product);
    const { quantity, id } = product;
    const getProductLength = this.tempCart.filter((prod) => prod.id === id)
      .length;
    if (getProductLength >= quantity) {
      this.presentToast(`not enough quantity please select another items`);
      return;
    }
    this.tempCart.push(product);
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async openCart() {
    if (this.cartItemCount === 0) {
      this.presentToast(`Please select an item`);
      return;
    }

    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: OrdersCartModalPage,
      cssClass: 'cart-modal',
      componentProps: {
        allProducts: this.products,
      },
    });
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: this.shopId,
      },
    };

    modal.onWillDismiss().then(({ data }) => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
      console.log('onWillDismiss', data);

      if (data) {
        const gotoOrderSummary = setTimeout(() => {
          this.router.navigate(['/order-summary'], navigationExtras);
          clearTimeout(gotoOrderSummary);
        }, 800);
      }
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
