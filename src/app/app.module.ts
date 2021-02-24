//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { AuthModule } from "./auth/auth.module";
//components
import { AppComponent } from './app.component';
//services
import { LazyLoadScriptService } from '../services/lazy-load-scripts.service';
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
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
    }),
    StoreModule.forRoot({
      exampleState,
    })
  ],
  providers: [
    LazyLoadScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
