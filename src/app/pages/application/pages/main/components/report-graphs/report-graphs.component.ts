import { Component, OnInit } from '@angular/core';
import { CostService } from '../../../../../../services/cost/cost.service';
import { Color } from 'ng2-charts';
import { reportGraphConstant } from '../../constants/report-graph-constants';
import { PresetService } from '../../../../../../services/preset/preset.service';

@Component({
  selector: 'app-report-graphs',
  templateUrl: './report-graphs.component.html',
  styleUrls: ['./report-graphs.component.scss']
})
export class ReportGraphsComponent implements OnInit {

  pieChartLabels = this.setExtendedChartLabelsData();
  pieChartData = this.costService.currentCostsSum;
  pieChartColors: Color[] = [{
    backgroundColor: []
  }];
  pieChartType = 'pie';
  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          return data.labels[tooltipItem.index];
        }
      }
    }
  };

  constructor(
    private costService: CostService,
    private presetService: PresetService,
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
    this.pieChartLabels.push(...this.setExtendedChartLabelsData());
    this.pieChartColors[reportGraphConstant.currentGraph].backgroundColor = this.costService.currentCostsColor;
  }

  setExtendedChartLabelsData() {
    let pieChartLabels = this.costService.currentCostsName;
    pieChartLabels = pieChartLabels.map((label, index) => {
      label += ` (${this.costService.currentCostsSum[index]}${this.presetService.currencySymbol})`;
      return label;
    });
    return pieChartLabels;
  }
}
