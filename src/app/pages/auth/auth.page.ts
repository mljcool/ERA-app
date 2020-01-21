import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure
} from 'firebaseui-angular';
import '@codetrix-studio/capacitor-google-auth';

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
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'logging in..',
      duration: 2000
    });
    await loading.present();

    loading.onDidDismiss().then(resp => {
      this.authService.login().then(response => {
        if (response) {
          this.router.navigateByUrl('/side-bar');
        }
      });
    });
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
            // this.showAlert();
            // this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
            // console.log('Delete clicked');
            this.signIn();
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

  async signIn(): Promise<void> {
    const googleUser = await Plugins.GoogleAuth.signIn();
    console.log(googleUser);
    if (googleUser) {
      this.fullName = googleUser.name;
    }
    // if (result) {
    //   history.push({
    //     pathname: '/home',
    //     state: { name: result.name || result.displayName, image: result.imageUrl, email: result.email }
    //   });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log(errorData);
  }
}
