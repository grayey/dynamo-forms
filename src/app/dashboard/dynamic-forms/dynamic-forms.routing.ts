import { Routes }  from "@angular/router";
import { AppFormioComponent } from "./app-formio/app-formio.component";

const DYNAMIC_FORM_ROUTES: Routes = [
  {
    path:"",
    component:AppFormioComponent
  }
]

export default DYNAMIC_FORM_ROUTES;
