import { Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { dropDownMenuConfig } from '../../constants/dropdown-menu-config';
import { DropdownMenuConfig } from '../../interfaces/dropdown-menu-config.interface';
import { PresetService } from '../../../../services/preset/preset.service';
import { DropdownMenuItem } from '../../interfaces/dropdown-menu-item.interfase';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  @Input() menuName: string;

  @ViewChild('dropDownMenu', {static: false})
  private dropDownMenu: ElementRef;
  private action: string;
  menuTitle: string;
  menuItems: DropdownMenuItem[] = [];

  constructor(
    private presetService: PresetService,
  ) {}

  ngOnInit() {
    this.createDropDownMenu();
  }

  showMenu() {
    this.dropDownMenu.nativeElement.classList.toggle('show');
  }

  selectMenuItem(selectValue: string, symbol = '') {
    const sign = symbol ? ` ${symbol}` : '';
    this.presetService[this.action](selectValue + sign);
    this.showMenu();
  }

  createDropDownMenu() {
    const config: DropdownMenuConfig = dropDownMenuConfig[this.menuName];
    this.menuTitle = config.menuTitle;
    this.menuItems = config.menuItems;
    this.action = config.action;
  }
}
