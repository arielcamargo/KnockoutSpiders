import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'add-employee', component:AddEmployeeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
