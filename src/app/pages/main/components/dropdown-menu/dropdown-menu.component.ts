import { Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
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
  @Input() openedDropdown: string;
  @Output() dropdownChange: EventEmitter<string> = new EventEmitter();

  private action: string;

  menuTitle: string;
  menuItems: DropdownMenuItem[] = [];

  constructor(
    private presetService: PresetService,
  ) {}

  ngOnInit() {
    this.createDropDownMenu();
  }

  onClick() {
    if (this.menuName === this.openedDropdown) {
      this.dropdownChange.emit();
    } else {
      this.dropdownChange.emit(this.menuName);
    }
  }

  selectMenuItem(selectValue: string, symbol = '') {
    const sign = symbol ? ` ${symbol}` : '';
    console.log(this.action);
    this.presetService[this.action](selectValue + sign);
    this.dropdownChange.emit();
  }

  createDropDownMenu() {
    const config: DropdownMenuConfig = dropDownMenuConfig[this.menuName];
    this.menuTitle = config.menuTitle;
    this.menuItems = config.menuItems;
    this.action = config.action;
    console.log(this.action);
  }
}
