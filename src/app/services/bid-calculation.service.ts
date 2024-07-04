import { Injectable } from '@angular/core';
import { VehicleType } from '../models/vehicle-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BidCalculationService {

  constructor() { }

  calculateBasicFee(price: number, vehicleType: VehicleType): number {
    const fee = 0.1 * price;
    if (vehicleType === VehicleType.Common) {
      return Math.min(Math.max(fee, 10), 50);
    } else if (vehicleType === VehicleType.Luxury) {
      return Math.min(Math.max(fee, 25), 200);
    }
    return 0;
  }

  calculateSpecialFee(price: number, vehicleType: VehicleType): number {
    if (vehicleType === VehicleType.Common) {
      return 0.02 * price;
    } else if (vehicleType === VehicleType.Luxury) {
      return 0.04 * price;
    }
    return 0;
  }

  calculateAssociationFee(price: number): number {
    if (price <= 500) {
      return 5;
    } else if (price <= 1000) {
      return 10;
    } else if (price <= 3000) {
      return 15;
    } else {
      return 20;
    }
  }

  calculateTotal(price: number, vehicleType: VehicleType): number {
    const basicFee = this.calculateBasicFee(price, vehicleType);
    const specialFee = this.calculateSpecialFee(price, vehicleType);
    const associationFee = this.calculateAssociationFee(price);
    const storageFee = 100;
    return price + basicFee + specialFee + associationFee + storageFee;
  }
}
