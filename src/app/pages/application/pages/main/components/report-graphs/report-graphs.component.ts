import { Color } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { reportGraphConstant } from '../../constants/report-graph-constants';
import { CostService } from '../../../../../../services/cost/cost.service';
import { PresetService } from '../../../../../../services/preset/preset.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { makeFirstLetterCapital } from '../../../../../../helpers/string-helper';
import { ChartType } from '../../constants/chart-type';

@Component({
  selector: 'app-report-graphs',
  templateUrl: './report-graphs.component.html',
  styleUrls: ['./report-graphs.component.scss'],
  providers: [
    TranslatePipe,
    CurrencyPipe,
  ],
})
export class ReportGraphsComponent implements OnInit {

  pieChartLabels = [];
  pieChartData = [];
  pieChartColors: Color[] = [{
    backgroundColor: []
  }];
  pieChartType = ChartType.Pie;
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
    private translatePipe: TranslatePipe,
    private translate: TranslateService,
    private currencyPipe: CurrencyPipe,
  ) {
  }

  ngOnInit() {
    this.costUpdateSubscribe();
    this.languageUpdateSubscribe();
  }

  costUpdateSubscribe() {
    this.costService.currentCostList
      .subscribe(
        () => this.updateChart(),
      );
  }

  updateChart() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChartData.push(...this.costService.currentCostsSum);
    this.pieChartLabels.push(...this.getExtendedChartLabelsData());
    this.pieChartColors[reportGraphConstant.currentGraph].backgroundColor = this.costService.currentCostsColor;
  }

  getExtendedChartLabelsData() {
    let pieChartLabels = this.costService.currentCostsNames;
    pieChartLabels = pieChartLabels.map((label: string, index: number) => this.createLabel(label, index));
    return pieChartLabels;
  }

  translateLabel(label: string) {
    const translateLabel = this.translatePipe.transform(`home.category.${label}`);
    if (translateLabel === `home.category.${label}`) {
      return makeFirstLetterCapital(label);
    }
    return translateLabel;
  }

  createLabel(label: string, index: number) {
    label = this.translateLabel(label);
    label += ` (${this.currencyPipe.transform(this.costService.currentCostsSum[index], ' ')}${this.presetService.currencySymbol})`;
    return makeFirstLetterCapital(label);
  }

  languageUpdateSubscribe() {
    this.translate.onLangChange
      .subscribe(
        () => this.updateChart(),
      );
  }

}
