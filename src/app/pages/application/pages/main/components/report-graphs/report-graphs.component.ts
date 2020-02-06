import { Color } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { reportGraphConstant } from '../../constants/report-graph-constants';
import { CostService } from '../../../../../../services/cost/cost.service';
import { PresetService } from '../../../../../../services/preset/preset.service';
import { makeFirstLetterCapital } from '../../../../../../helpers/string';
import { ChartType } from '../../constants/chart-type';
import { chartCurrency } from '../../../../../../global-constants/chart-currency';

@Component({
  selector: 'app-report-graphs',
  templateUrl: './report-graphs.component.html',
  styleUrls: ['./report-graphs.component.scss'],
  providers: [
    TranslatePipe,
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
    this.pieChartData.push(...this.costService.getCostsSums());
    this.pieChartLabels.push(...this.getExtendedChartLabelsData());
    this.pieChartColors[reportGraphConstant.currentGraph].backgroundColor = this.costService.getCostsColors();
  }

  getExtendedChartLabelsData() {
    let pieChartLabels = this.costService.getCostsNames();
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
    label += ` (${this.currencyPipe.transform(this.costService.getCostsSums()[index], ' ')}`;
    label += ` ${chartCurrency.get(this.presetService.currencySymbol)})`;
    return makeFirstLetterCapital(label);
  }

  languageUpdateSubscribe() {
    this.translate.onLangChange
      .subscribe(
        () => this.updateChart(),
      );
  }

}
