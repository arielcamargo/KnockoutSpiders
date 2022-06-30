import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from "@angular/router";
import {createVendiaClient} from "@vendia/client";

const client = createVendiaClient({

  apiUrl: `https://z2z10z6138.execute-api.us-west-1.amazonaws.com/graphql/`,
  websocketUrl: `wss://ssope56ubl.execute-api.us-west-1.amazonaws.com/graphql`,
  apiKey: `naUSK3QaBR8gPJcjj8N8diBaDNcuBdSe9UgDooCJciD`,
});

const {entities} = client;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddEmployeeComponent implements OnInit {
  constructor(private router: Router) {
  }
  ngOnInit()
  {
  }

  clickedAddButton()
  {
    //This would pull all data from
    //this form and click it back to
    //Vendia
    this.goToDashboard();
  }

  goToDashboard()
  {
    this.async().then();
    this.router.navigate(['']).then();
  }

  async async() {

    // @ts-ignore
    const employeeResponse = await entities.employee.add({
      age: 14,
      avgHourseOfExercisePerWeek: 56,
      avgHourseOfWorkPerWeek: 67,
      bloodPressure: '78',
      bodyTemperature: 78,

      firstName: 'DoesEmployeeChange',


      gender: 'Woman',
      height: 1,
      lastName: 'Leone',
      pulseRate: 56,
      respirationRate: 45,
      vacationBalance: 15,
      weight: 156,
    });

    console.log(employeeResponse);
  }


}
