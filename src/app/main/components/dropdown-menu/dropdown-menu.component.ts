import {Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {dropDownMenuConfig} from '../../constants/dropdown-menu-config';
import {DropdownMenuConfig} from '../../interfaces/dropdown-menu-config.interface';
import {PresetService} from '../../services/preset/preset.service';
import {DropdownMenuItem} from '../../interfaces/dropdown-menu-item.interfase';
import {UserService} from '../../../authorization/services/user/user.service';

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
  currentValue = this.presetService[this.menuName];
  action: string;

  constructor(
    private presetService: PresetService,
    private usersService: UserService,
  ) {
  }

  ngOnInit() {
    console.log('before' , this.presetService.currency);
    this.createDropDownMenu();
    console.log(this.currentValue);
  }

  showMenu() {
    this.dropDownMenu.nativeElement.classList.toggle('show');
    console.log(this.presetService.language, this.presetService.currency);
  }

  selectMenuItem(selectValue: string, symbol = '') {
    this.presetService[this.action](selectValue + ' ' + symbol);
    this.currentValue = this.presetService[this.menuName];
    this.showMenu();
  }

  createDropDownMenu() {
    const config: DropdownMenuConfig = dropDownMenuConfig[this.menuName];
    this.menuTitle = config.menuTitle;
    this.menuItems = config.menuItems;
    this.action = config.action;
    this.currentValue = this.presetService[this.menuName];
    console.log('create', this.presetService.currency, this.presetService.language);
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
