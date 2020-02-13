import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
})
export class AssistanceComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onProceed(): void {

  }
  dismiss(){
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
