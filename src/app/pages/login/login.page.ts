import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


const { Modals } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, public loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'logging in..',
      duration: 2000
    });
    await loading.present();

    loading.onDidDismiss().then(resp => {
      this.router.navigate(['/side-bar']);
    });

  }


  async showAlert() {
    let alertRet = await Modals.alert({
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
      buttons: [{
        text: 'Sign up with Google',
        role: 'destructive',
        icon: 'logo-googleplus',
        handler: () => {
          this.showAlert();
          console.log('Delete clicked');
        }
      }, {
        text: 'Sign up with Facebook',
        icon: 'logo-facebook',
        handler: () => {
          this.showAlert();
          console.log('Share clicked');
        }
      }, {
        text: 'Sign up with email',
        icon: 'mail',
        handler: () => {
          this.showAlert();
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
