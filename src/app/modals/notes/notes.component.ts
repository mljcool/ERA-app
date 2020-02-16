import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {

  notes: any;
  constructor(private modalCtrl: ModalController, public toastController: ToastController) { }

  ngOnInit() { }


  dismiss() {
    if (!this.notes) {
      this.presentToast();
      return;
    }

    this.modalCtrl.dismiss({
      dismissed: true,
      notes: this.notes
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Notes is requried',
      duration: 600
    });
    toast.present();
  }

}
