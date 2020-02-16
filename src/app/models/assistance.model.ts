

interface IShopLocation {
  latitude: number;
  longitude: number;
}

export interface IAssistance {
  key?: string;
  myId: string;
  shopId: string;
  assistanceType: string;
  mylocation: IShopLocation;
  status: boolean;
  escalatedTime: string;
  note: string;
}
