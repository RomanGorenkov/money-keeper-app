import {DropdownMenuItem} from './dropdown-menu-item.interfase';

export interface DropdownMenuConfig {
  menuTitle: string;
  menuItems: DropdownMenuItem[];
  action: string;
}
