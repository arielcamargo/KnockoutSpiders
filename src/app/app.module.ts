import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from "../dashboard/dashboard.component";
import { TestingComponent } from './components/testing/testing.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TestingComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [
        {path: 'add-employee', component: AddEmployeeComponent},
        {path: '', component: DashboardComponent},
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
