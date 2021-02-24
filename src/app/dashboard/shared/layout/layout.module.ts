import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';


@NgModule({
  declarations: [DashboardHeaderComponent, DashboardFooterComponent, DashboardSidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [DashboardHeaderComponent, DashboardFooterComponent, DashboardSidebarComponent],

})
export class LayoutModule { }
