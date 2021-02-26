import { Routes }  from "@angular/router";
import { AppFormioComponent } from "./app-formio/app-formio.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { FormviewComponent } from './formview/formview.component';
import { SubmissionsComponent } from './submissions/submissions.component';


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
    path:"view-edit/:form_id",
    component:EditComponent
  },
  {
    path:"submission/:form_path",
    component:FormviewComponent
  },
  {
    path:"submissions/:form_path",
    component:SubmissionsComponent
  },
]

export default DYNAMIC_FORM_ROUTES;
