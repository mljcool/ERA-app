import { Product, CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CheckoutCartService } from '../checkout.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { LoctionPickerPage } from 'src/app/modals/loction-picker/loction-picker.page';
import { SetContactInfoPage } from 'src/app/modals/set-contact-info/set-contact-info.page';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss']
})
export class CartModalPage implements OnInit {
  cart: Product[] = [];
  isSubmitting = false;
  customerExtraInfo = '';
  customerAddress = false;
  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private checkoutSrvc: CheckoutCartService,
    private googleStorageUser: StoragUserDataService,
    public loadingController: LoadingController,
    public toastController: ToastController
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

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  async openLocationPicker() {

    const modal = await this.modalCtrl.create({
      component: LoctionPickerPage,
      componentProps: {
        title: 'Delivery Address'
      }
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      console.log(data);
      this.customerAddress = data.address;
      if (this.customerAddress) {
        this.openContactPicker();
      }
    });
  }

  async openContactPicker() {

    const modal = await this.modalCtrl.create({
      component: SetContactInfoPage,
      componentProps: {
        title: 'Contact info Address'
      }
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      console.log(data);
      this.customerExtraInfo = data.info;
      if (this.customerExtraInfo) {
        this.checkout();
      }
    });

  }

  checkout() {
    if (this.cart.length === 0) {
      this.presentToast('You have nothing to checkout.');
      return;
    }
    if (!this.customerAddress) {
      this.presentToast('Delivery address is required');
      this.openLocationPicker();
      return;
    }
    if (!this.customerExtraInfo) {
      this.presentToast('Contact is required');
      this.openContactPicker();
      return;
    }
    this.presentLoading();
    this.googleStorageUser.getObjectGoogleUsers().then(data => {

      const extraDetails = {
        customerAddress: this.customerAddress, customerExtraInfo: this.customerExtraInfo
      };

      this.checkoutSrvc.checkoutOrders(this.cart, this.getTotal(), data.id, data.name, extraDetails).then(response => {
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
