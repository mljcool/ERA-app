import { Injectable } from '@angular/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';

const { PushNotifications, Modals } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationFeatures(featureSwitch: boolean) {
    if (!featureSwitch) {
      alert('Push registration is intentionally turned off. ');
      return;
    }
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
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
        alert('Push action performed: ' + JSON.stringify(notification));
        console.log('Push action performed: ' + notification);
      }
    );
  }
}
