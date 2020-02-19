import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/pages/shopping-cart/cart.service';

@Component({
  selector: 'app-modal-preview-items',
  templateUrl: './modal-preview-items.page.html',
  styleUrls: ['./modal-preview-items.page.scss'],
})
export class ModalPreviewItemsPage implements OnInit {
  cart: Product[] = [];


  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.cart = this.navParams.get('products');
  }

  ngOnInit() {
  }
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
