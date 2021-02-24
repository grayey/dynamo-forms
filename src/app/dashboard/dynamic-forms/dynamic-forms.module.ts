import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormioComponent } from './app-formio/app-formio.component';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { RouterModule } from '@angular/router';
import DYNAMIC_FORM_ROUTES from './dynamic-forms.routing';

import { AppConfig } from './config';

@NgModule({
  declarations: [AppFormioComponent],
  imports: [
    CommonModule,
    FormioModule,
    RouterModule.forChild(DYNAMIC_FORM_ROUTES)
  ],
  providers: [
    {provide: FormioAppConfig, useValue: AppConfig}
  ],
})
export class DynamicFormsModule { }
