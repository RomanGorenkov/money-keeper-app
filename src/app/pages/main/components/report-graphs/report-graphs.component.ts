import { Component } from '@angular/core';
import { CostService } from '../../services/cost/cost.service';

@Component({
  selector: 'app-report-graphs',
  templateUrl: './report-graphs.component.html',
  styleUrls: ['./report-graphs.component.scss']
})
export class ReportGraphsComponent {

  pieChartLabels = this.costService.currentCostsName;
  pieChartData = this.costService.currentCostsSum;
  pieChartType = 'pie';

  constructor(
    private costService: CostService,
  ) { }

}
