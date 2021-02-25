import  { Routes } from "@angular/router";
import DashboardHomeComponent from "./dashboard-home/dashboard-home.component";
import DashboardIndexComponent from "./dashboard-index.component";

const DASHBOARD_ROUTES:Routes = [
  {
    path:"",
    component:DashboardIndexComponent,
    children:[
      {
        path:"",
        component:DashboardHomeComponent,
      },
      {
        path:'forms',
        loadChildren: async () => (await import("./dynamic-forms/dynamic-forms.module")).DynamicFormsModule
      }
    ]
  }
]

export default DASHBOARD_ROUTES;
