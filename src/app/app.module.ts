import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEventComponent } from './create-event/create-event.component';
import {HttpClientModule} from '@angular/common/http';
import { ViewEventDetailComponent } from './view-event-detail/view-event-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    ViewEventDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
