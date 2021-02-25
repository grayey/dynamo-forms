import { Routes }  from "@angular/router";
import { AppFormioComponent } from "./app-formio/app-formio.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";

const DYNAMIC_FORM_ROUTES: Routes = [
  {
    path:"",
    component:AppFormioComponent
  },
  {
    path:"create",
    component:CreateComponent
  },
  {
    path:"edit",
    component:EditComponent
  },
]

export default DYNAMIC_FORM_ROUTES;
