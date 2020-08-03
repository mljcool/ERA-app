
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { LoctionPickerPage } from 'src/app/modals/loction-picker/loction-picker.page';
import { SetContactInfoPage } from 'src/app/modals/set-contact-info/set-contact-info.page';
import { CartService } from '../order-services/make-oders.service';
import { IProduct } from '../Product.model';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss']
})
export class OrdersCartModalPage implements OnInit {
  cart: IProduct[] = [];
  isSubmitting = false;
  customerExtraInfo = '';
  customerAddress = false;
  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
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

  checkout() {
    if (this.cart.length === 0) {
      this.presentToast('Cart is empty');
      return;
    }
    this.modalCtrl.dismiss({
      isCheckOut: true
    })

  }

  async presentLoading() {
    this.isSubmitting = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

}
