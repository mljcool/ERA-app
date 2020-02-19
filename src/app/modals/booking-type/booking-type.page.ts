import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.page.html',
  styleUrls: ['./booking-type.page.scss'],
})
export class BookingTypePage implements OnInit {


  services: AssistanceTypes[] = [
    {
      id: 1,
      label: 'Schedule an appointment',
      imgSrc: this.srcPath('calendar.gif')
    },
    {
      id: 2,
      label: 'Shop a parts',
      imgSrc: this.srcPath('cart.gif')

    }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onProceed(data: any): void {
    this.modalCtrl.dismiss({
      dismissed: true,
      id: data.id,
    });
  }



  srcPath(imgName): string {

    return `./assets/images/commons/${imgName}`;
  }


}
