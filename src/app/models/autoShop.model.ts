export interface Ilocations {
  latitude: number;
  longitude: number;
}

export interface IAutoShop {
  key: string;
  shopId: string;
  name: string;
  ownerId: string;
  status: boolean;
  locations?: Ilocations;
}
