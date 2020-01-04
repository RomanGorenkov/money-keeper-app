import { Component, OnInit } from '@angular/core';
import { CostService } from '../../../../services/cost/cost.service';
import { Color } from 'ng2-charts';
import { reportGraphConstant } from '../../constants/report-graph-constants';

@Component({
  selector: 'app-report-graphs',
  templateUrl: './report-graphs.component.html',
  styleUrls: ['./report-graphs.component.scss']
})
export class ReportGraphsComponent implements OnInit {

  pieChartLabels = this.costService.currentCostsName;
  pieChartData = this.costService.currentCostsSum;
  pieChartColors: Color[] = [{
    backgroundColor: []
  }];
  pieChartType = 'pie';
  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(
    private costService: CostService,
  ) {

  }

  ngOnInit() {
    this.chartUpdateSubscribe();
  }

  chartUpdateSubscribe() {
    this.costService.currentCostList.subscribe(
      () => {
        this.updateChart();
      }
    );
  }

  updateChart() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChartData.push(...this.costService.currentCostsSum);
    this.pieChartLabels.push(...this.costService.currentCostsName);
    this.pieChartColors[reportGraphConstant.currentGraph].backgroundColor = this.costService.currentCostsColor;
  }
}
