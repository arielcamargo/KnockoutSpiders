import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from "../dashboard/dashboard.component";
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {RouterModule} from "@angular/router";
import { TableDisplayComponent } from './table-display/table-display.component';
import {FormsModule} from "@angular/forms";
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddEmployeeComponent,
    TableDisplayComponent,
    UpdateEmployeeComponent,
    DeleteEmployeeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(
            [
                {path: 'add-employee', component: AddEmployeeComponent},
                {path: '', component: DashboardComponent},
                {path: 'table-display', component: TableDisplayComponent},
            ]
        ),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
