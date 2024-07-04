import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BidCalculationService } from '../../services/bid-calculation.service';
import { VehicleType } from '../../models/vehicle-type.enum';
import { Fees } from '../../models/fees.model';

@Component({
  selector: 'app-bid-calculator',
  templateUrl: './bid-calculator.component.html',
  styleUrls: ['./bid-calculator.component.scss']
})
export class BidCalculatorComponent {
  bidForm: FormGroup;
  totalCost: number = 0;
  fees: Fees = { basic: 0, special: 0, association: 0, storage: 100 };
  VehicleType = VehicleType;

  constructor(private fb: FormBuilder, private bidCalcService: BidCalculationService) {
    this.bidForm = this.fb.group({
      basePrice: [0],
      vehicleType: [VehicleType.Common]
    });

    this.bidForm.valueChanges.subscribe(values => {
      this.calculateCosts(values.basePrice, values.vehicleType);
    });
  }

  calculateCosts(basePrice: number, vehicleType: VehicleType): void {
    this.fees.basic = this.bidCalcService.calculateBasicFee(basePrice, vehicleType);
    this.fees.special = this.bidCalcService.calculateSpecialFee(basePrice, vehicleType);
    this.fees.association = this.bidCalcService.calculateAssociationFee(basePrice);
    this.fees.storage = 100;
    this.totalCost = this.bidCalcService.calculateTotal(basePrice, vehicleType);
  }
}
