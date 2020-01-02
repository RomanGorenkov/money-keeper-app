import { Component, Input, OnInit } from '@angular/core';
import { NavbarConfig } from '../../interfaces/navbar-config.interface';
import { navbarConfigs } from '../../constants/navbar-config';

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
