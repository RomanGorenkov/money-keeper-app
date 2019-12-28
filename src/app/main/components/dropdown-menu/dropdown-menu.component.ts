import {Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {dropDownMenuConfig} from '../../constants/dropdown-menu-config';
import {DropdownMenuConfig} from '../../interfaces/dropdown-menu-config.interface';
import {CostsService} from '../../services/costs/costs.service';
import {DropdownMenuItem} from '../../interfaces/dropdown-menu-item.interfase';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  @Input() menuName: string;

  @ViewChild('dropDownMenu', {static: false})
  private dropDownMenu: ElementRef;

  menuTitle: string;
  menuItems: DropdownMenuItem[] = [];
  currentValue = 'select';
  action: string;

  constructor(
    private costsService: CostsService,
  ) {
  }

  ngOnInit() {
    this.createDropDownMenu();
    // this.setDefaultMenuValue();
  }

  showMenu() {
    this.dropDownMenu.nativeElement.classList.toggle('show');
  }

  selectMenuItem(selectValue: string, symbol = '') {
    this.currentValue = selectValue + ' ' + symbol;
    this.costsService[this.action](this.currentValue);
    this.showMenu();
  }

  createDropDownMenu() {
    const config: DropdownMenuConfig = dropDownMenuConfig[this.menuName];
    this.menuTitle = config.menuTitle;
    this.menuItems = config.menuItems;
    this.action = config.action;
    this.currentValue = this.costsService[this.menuName];
  }

  setDefaultMenuValue() {
    const defaultMenuItem = this.menuItems[0];
    this.selectMenuItem(defaultMenuItem.name, defaultMenuItem.symbol);
  }

// Close the dropdown menu if the user clicks outside of it
//    window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }

}
