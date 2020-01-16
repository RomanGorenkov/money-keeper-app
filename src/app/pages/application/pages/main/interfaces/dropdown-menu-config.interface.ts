import { DropdownMenuItem } from './dropdown-menu-item.interfase';

export interface DropdownMenuConfig {
  menuName: string;
  menuTitle: string;
  menuItems: DropdownMenuItem[];
  action: string;
}
