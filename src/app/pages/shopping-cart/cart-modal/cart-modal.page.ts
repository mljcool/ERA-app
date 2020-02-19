import { Product, CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CheckoutCartService } from '../checkout.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss']
})
export class CartModalPage implements OnInit {
  cart: Product[] = [];

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private checkoutSrvc: CheckoutCartService,
    private googleStorageUser: StoragUserDataService,
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
    console.log('here', product);
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  checkout() {

    this.googleStorageUser.getObjectGoogleUsers().then(data => {
      this.checkoutSrvc.checkoutOrders(this.cart, this.getTotal(), data.id, data.name).then(response => {
        console.log(this.cart);
        this.alertCtrl.create({
          header: 'Thanks for your Order!',
          message: 'We will deliver your item as soon as possible',
          buttons: ['OK']
        }).then(alert => {
          alert.present().then(() => {
            this.modalCtrl.dismiss();
          });

        });
      });
    });




    // Perfom PayPal or Stripe checkout process
    console.log(this.cart);

  }
}
