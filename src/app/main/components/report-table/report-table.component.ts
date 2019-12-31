import { Component, OnInit } from '@angular/core';
import {CostService} from '../../services/cost/cost.service';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  constructor(
    public costService: CostService,
  ) { }

  ngOnInit() {
  }

}
