import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { UserNotificationService } from '../users/reg-notification-user.service';
import { StoragUserDataService } from '../storages/storage-user-services';
import { IUsersNotifConfig } from 'src/app/models/notification.model';

const { PushNotifications, Modals } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private userNotificationService: UserNotificationService,
    private googleStorageUser: StoragUserDataService,
    private router: Router
  ) { }

  notificationFeatures(featureSwitch: boolean) {
    if (!featureSwitch) {
      // alert('Push registration is intentionally turned off. ');
      return;
    }
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        this.googleStorageUser.getObjectGoogleUsers().then(data => {
          const params: IUsersNotifConfig = {
            status: true,
            token: token.value,
            userId: data.id
          };
          this.userNotificationService
            .createCustomerToken(params)
            .then(() => {
              console.log(
                'Push registration success, token: ' +
                token.value
              );
            });
        });
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        const audio1 = new Audio('assets/audio.mp3');
        console.log('Audio');
        audio1.play();
        // alert('Push received: ' + JSON.stringify(notification));
        console.log('Push received: ', notification);

        const alertRet = Modals.alert({
          title: notification.title,
          message: notification.body
        });
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        const parseData = JSON.parse(JSON.stringify(notification));
        const alertRet = Modals.alert({
          title: 'Hello',
          message: parseData.notification.data.extra_information
        });
        alertRet.then(() => {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              id: parseData.notification.data.assistanceId,
              navigationId: 1,
            }
          };
          this.router.navigate(
            ['/side-bar/assistance-preview'],
            navigationExtras
          );
        });
        console.log('Push action performed: ' + notification);
      }
    );
  }
}
