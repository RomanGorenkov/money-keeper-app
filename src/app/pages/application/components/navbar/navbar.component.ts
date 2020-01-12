import { Component, Input, OnInit } from '@angular/core';
import { NavbarConfig } from '../../pages/main/interfaces/navbar-config.interface';
import { navbarConfigs } from '../../pages/main/constants/navbar-config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() navbarName: string;
  linkItems: NavbarConfig[];

  ngOnInit() {
    this.createDropDownMenu();
  }

  createDropDownMenu() {
    this.linkItems = navbarConfigs[this.navbarName];
  }

}
