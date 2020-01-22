import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure
} from 'firebaseui-angular';
import '@codetrix-studio/capacitor-google-auth';

import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

const { Modals } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  fullName: string;

  constructor(
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    public router: Router,
    private authService: AuthServiceService,
    public afAuth: AngularFireAuth,
    private googleStorageUser: StoragUserDataService
  ) {}

  ngOnInit() {
    this.googleStorageUser.getObjectGoogleUsers().then(response => {
      if (!!response) {
        console.log(response.isLogin);
        this.navigateMainPage();
      }
    });
  }

  async userGoogleLogin() {
    this.loadingIndicators();
    this.authService.login().then(response => {
      if (response) {
        this.loadingController.dismiss().then(() => {
          this.navigateMainPage();
        });
      }
    });
  }

  navigateMainPage(): void {
    this.router.navigateByUrl('/side-bar');
  }

  async loadingIndicators() {
    const loading = await this.loadingController.create({
      message: 'logging in..'
    });
    await loading.present();
  }

  async showAlert() {
    const alertRet = await Modals.alert({
      title: 'Feature',
      message: 'Working in Progress'
    });
  }

  openActionSheetSignUp(): void {
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Creat an account',
      buttons: [
        {
          text: 'Sign up with Google',
          role: 'destructive',
          icon: 'logo-googleplus',
          handler: () => {
            this.userGoogleLogin();
          }
        },
        {
          text: 'Sign up with Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.showAlert();
            console.log('Share clicked');
          }
        },
        {
          text: 'Sign up with email',
          icon: 'mail',
          handler: () => {
            this.showAlert();
            console.log('Play clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
