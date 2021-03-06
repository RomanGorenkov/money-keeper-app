import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

import { MainModule } from './pages/main/main.module'
import { ApplicationComponent } from './pages/application.component'
import { ApplicationRoutingModule } from './application-routing.module'
import { UserSettingsModule } from './pages/user-settings/user-settings.module'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { DropdownMenuComponent } from './components/toolbar/dropdown-menu/dropdown-menu.component'
import { TotalCostComponent } from './components/total-cost/total-cost.component'

@NgModule({
  imports: [ApplicationRoutingModule, MainModule, UserSettingsModule, CommonModule, TranslateModule.forChild()],
  declarations: [ApplicationComponent, ToolbarComponent, NavbarComponent, DropdownMenuComponent, TotalCostComponent],
  providers: [],
  exports: [ToolbarComponent, NavbarComponent, DropdownMenuComponent],
  entryComponents: [],
})
export class ApplicationModule {}
