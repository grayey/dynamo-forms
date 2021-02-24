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
import { LazyLoadScriptService } from '../services/lazy-load-scripts.service';
import { UserService } from '../services/user/user.service';
import { FormsService } from '../services/forms/forms.service';


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
    UserService,
    FormsService,
    LazyLoadScriptService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
