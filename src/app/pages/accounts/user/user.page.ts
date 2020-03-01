import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { StorageContactService } from 'src/app/services/storages/mobile-numbers.service';
import { ContaInfo } from 'src/app/models/contactNumber.model';
import { ContactInfoPage } from 'src/app/modals/contact-info/contact-info.page';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
    userData: GoogleUser;
    contactInfo: ContaInfo;

    constructor(
        private googleStorageUser: StoragUserDataService,
        private modalCtrl: ModalController,
        private contactInfoSrvc: StorageContactService
    ) {
        this.googleStorageUser.getObjectGoogleUsers().then(response => {
            this.userData = response;
        });
        this.contactInfoSrvc.getUserContact().then(contactInfoResp => {
            this.contactInfo = contactInfoResp;
        });
    }

    ngOnInit() {}

    setupContactInformations(): void {
        this.openContactSetup();
    }

    async openContactSetup() {
        const modal = await this.modalCtrl.create({
            component: ContactInfoPage,
            componentProps: {
                title: 'Contact info'
            }
        });
        modal.present();
        modal.onDidDismiss().then(({ data }) => {});
    }
}
