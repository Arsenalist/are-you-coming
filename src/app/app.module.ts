import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEventComponent } from './create-event/create-event.component';
import {HttpClientModule} from '@angular/common/http';
import { ViewEventDetailComponent } from './view-event-detail/view-event-detail.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './event.reducer';
import { EventEffects } from './event.effects';
import {EffectsModule} from "@ngrx/effects";
import {environment} from "../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    ViewEventDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ appState: reducer }),
    EffectsModule.forRoot([EventEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
