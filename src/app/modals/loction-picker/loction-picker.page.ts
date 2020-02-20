import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-loction-picker',
  templateUrl: './loction-picker.page.html',
  styleUrls: ['./loction-picker.page.scss'],
})
export class LoctionPickerPage implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  private geoCoder;
  address: string;
  modalTitle = '';
  isSearching = false;
  @ViewChild('search', {
    static: false
  }) public searchElementRef;

  constructor(private navCtrl: NavController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalCtrl: ModalController,
    private navParams: NavParams) {

    this.modalTitle = this.navParams.get('title') || 'Enter Address';
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.zoom = 4;
    this.latitude = 7.1135999;
    this.longitude = 125.5821493;
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();

      const nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });


      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (
            place.geometry === undefined ||
            place.geometry === null
          ) {
            return;
          }
          this.isSearching = true;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  doneLocating(): void {
    this.modalCtrl.dismiss({
      dismiss: true,
      address: {
        latitude: this.latitude,
        longitude: this.longitude,
        formattedAddres: this.address
      }
    });
  }

  getAddress(latitude: number, longitude: number): void {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        }
      }
    );
  }

}
