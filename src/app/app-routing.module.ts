import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEventComponent} from './create-event/create-event.component';
import {ViewEventDetailComponent} from "./view-event-detail/view-event-detail.component";

const routes: Routes = [
  { path: '', component: CreateEventComponent},
  { path: 'e/:event_hash', component: ViewEventDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
