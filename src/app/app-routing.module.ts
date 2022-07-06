import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {TableDisplayComponent} from "./table-display/table-display.component";
import {DeleteEmployeeComponent} from "./delete-employee/delete-employee.component";
import {UpdateEmployeeComponent} from "./update-employee/update-employee.component";

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'add-employee', component:AddEmployeeComponent},
  {path: 'table-display', component: TableDisplayComponent},
  {path: 'delete-employee', component: DeleteEmployeeComponent},
  {path: 'update-employee', component: UpdateEmployeeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
