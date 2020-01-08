import { Component } from '@angular/core';
import { CostService } from '../../../../../services/cost/cost.service';
import { PresetService } from '../../../../../services/preset/preset.service';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.scss']
})
export class TotalCostComponent {

  constructor(
    public costService: CostService,
    public presetService: PresetService,
  ) {
  }
}
