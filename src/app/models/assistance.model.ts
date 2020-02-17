

interface IShopLocation {
  latitude: number;
  longitude: number;
}

export interface IAssistance {
  id: string;
  key?: string;
  myId: string;
  shopId: string;
  assistanceType: AssistanceTypes;
  mylocation: IShopLocation;
  status: string;
  escalatedTime: string;
  flatRate: string;
  note: string;
  googleStravelTimeEstimates: string;
  googleDistanceEstimates: string;
  googleWrittenAddress: string;
}
