import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from './shared/shared.module';

import DashboardIndexComponent  from './dashboard-index.component'; //default
import DashboardHomeComponent  from './dashboard-home/dashboard-home.component'; //default

import DASHBOARD_ROUTES from './dashboard.routing';


@NgModule({
  declarations: [DashboardIndexComponent, DashboardHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DASHBOARD_ROUTES)
  ]
})
export class DashboardModule { }
