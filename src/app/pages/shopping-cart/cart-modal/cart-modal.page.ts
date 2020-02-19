import { Product, CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { CheckoutCartService } from '../checkout.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss']
})
export class CartModalPage implements OnInit {
  cart: Product[] = [];
  isSubmitting = false;
  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private checkoutSrvc: CheckoutCartService,
    private googleStorageUser: StoragUserDataService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  checkout() {
    this.presentLoading();
    this.googleStorageUser.getObjectGoogleUsers().then(data => {
      this.checkoutSrvc.checkoutOrders(this.cart, this.getTotal(), data.id, data.name).then(response => {
        this.alertCtrl.create({
          header: 'Thanks for your Order!',
          message: 'We will deliver your item as soon as possible',
          buttons: ['OK']
        }).then(alert => {
          alert.present().then(() => {
            this.modalCtrl.dismiss();
            this.loadingController.dismiss();
            this.isSubmitting = false;
            this.cartService.clearCart();
          });
        });
      });
    });
  }

  async presentLoading() {
    this.isSubmitting = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

}
