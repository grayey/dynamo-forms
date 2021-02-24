import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const AUTH_ROUTES:Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"forgot-password",
    component:ForgotPasswordComponent
  },
  {
    path:"reset-password",
    component:ResetPasswordComponent
  },
]

export default AUTH_ROUTES;
