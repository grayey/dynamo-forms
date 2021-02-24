import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormioComponent } from './app-formio/app-formio.component';
import { FormioModule } from 'angular-formio';
import { RouterModule } from '@angular/router';
import DYNAMIC_FORM_ROUTES from './dynamic-forms.routing';


@NgModule({
  declarations: [AppFormioComponent],
  imports: [
    CommonModule,
    FormioModule,
    RouterModule.forChild(DYNAMIC_FORM_ROUTES)
  ]
})
export class DynamicFormsModule { }
