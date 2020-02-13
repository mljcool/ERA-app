
export class VehicleModel {
  id: string;
  plateNumber: string;
  model: string;
  modelYear: string;
  color: string;
  fuelType: string;

  constructor(vehicle) {
    {
      this.id = vehicle.id || this.generateGUID();
      this.plateNumber = vehicle.name || '';
      this.model = vehicle.model || '';
      this.modelYear = vehicle.modelYear || '';
      this.color = vehicle.color || '';
      this.fuelType = vehicle.fuelType || '';
    }
  }

  generateGUID(): string {
    function S4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return S4() + S4();
  }
}

