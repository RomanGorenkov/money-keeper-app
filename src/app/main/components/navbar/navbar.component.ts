import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DropdownMenuConfig} from '../../interfaces/dropdown-menu-config.interface';
import {dropDownMenuConfig} from '../../constants/dropdown-menu-config';
import {NavbarConfig} from '../../interfaces/navbar-config.interface';
import {navbarConfigs} from '../../constants/navbar-config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() navbarName: string;

  linkItems: NavbarConfig[];


  constructor() {
  }

  ngOnInit() {
    this.createDropDownMenu();
  }


  createDropDownMenu() {
    this.linkItems = navbarConfigs[this.navbarName];
  }

}
