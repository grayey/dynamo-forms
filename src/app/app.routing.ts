import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const APP_ROUTES:Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"dashboard",
    loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule


  }
]

export default APP_ROUTES;
