import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFormioComponent } from './app-formio/app-formio.component';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { RouterModule } from '@angular/router';
import DYNAMIC_FORM_ROUTES from './dynamic-forms.routing';

import { AppConfig } from './config';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [AppFormioComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormioModule,
    RouterModule.forChild(DYNAMIC_FORM_ROUTES)
  ],
  providers: [
    {provide: FormioAppConfig, useValue: AppConfig}
  ],
})
export class DynamicFormsModule { }
