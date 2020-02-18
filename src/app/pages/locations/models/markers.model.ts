import { IAutoShop } from 'src/app/models/autoShop.model';

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  shopName?: string;
  draggable: boolean;
  iconUrl: CustomMarkersAndSize;
  shopData?: IAutoShop;
}

export interface CustomMarkersAndSize {
  url: string;
  scaledSize: {
    width: number;
    height: number;
  };
}

export interface CurrentLocations {
  latitude: number;
  longitude: number;
  message?: string;
  iconUrl: CustomMarkersAndSize;
}
