//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from "./auth/auth.module";

//components
import { AppComponent } from './app.component';

//services
import { ApiHandlerService } from '../services/api-handler.service';
import { ApiInterceptorService } from '../services/api-interceptor.service';
import { LazyLoadScriptService } from '../services/lazy-load-scripts.service';
import { UserService } from '../services/user/user.service';
import { FormsService } from '../services/forms/forms.service';
import { SubmissionsService } from '../services/submissions/submissions.service';


//others
import APP_ROUTES from './app.routing';
import exampleState from '../ngrx/reducers/example.reducer'; //default export

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
    }),
    StoreModule.forRoot({
      exampleState,
    })
  ],
  providers: [
    ApiHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    UserService,
    FormsService,
    SubmissionsService,
    LazyLoadScriptService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
