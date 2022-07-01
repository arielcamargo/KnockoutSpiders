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
  constructor(private router: Router)
  {
  }
  gender = 0;
  firstName: string = 'John';
  lastName: string = 'Doe';
  age: number = 18;
  height: number = 70;
  bodyTemp: number = 98;
  pulseRate: number = 80;
  bloodPressure: string = '(120 80)';
  respirationRate: number = 12;
  weight: number = 110;
  avgHoursExercise: number = 4;
  vacationBalance: number = 8;
  avgHoursOfWo: number = 40;




  ngOnInit()
  {
  }

  clickedAddButton()
  {
    //This would pull all data from
    //this form and click it back to
    //Vendia
    this.async().then();

  }

  goToDashboard()
  {

    this.router.navigate(['']).then();
  }

  async async() {
    if (this.gender === 0)
    {
      const employeeResponse = await entities.employee.add({
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
        bloodPressure: this.bloodPressure,
        bodyTemperature: this.bodyTemp,
        firstName: this.firstName,
        gender: 'Man',
        height: this.height,
        lastName: this.lastName,
        pulseRate: this.pulseRate,
        respirationRate: this.respirationRate,
        vacationBalance: this.vacationBalance,
        weight: this.weight,
      });
    }
    else if (this.gender === 1)
    {
      const employeeResponse = await entities.employee.add({
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
        bloodPressure: this.bloodPressure,
        bodyTemperature: this.bodyTemp,
        firstName: this.firstName,
        gender: 'Woman',
        height: this.height,
        lastName: this.lastName,
        pulseRate: this.pulseRate,
        respirationRate: this.respirationRate,
        vacationBalance: this.vacationBalance,
        weight: this.weight,
      });
    }
    else if (this.gender === 2)
    {
      const employeeResponse = await entities.employee.add({
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
        bloodPressure: this.bloodPressure,
        bodyTemperature: this.bodyTemp,
        firstName: this.firstName,
        gender: 'Transgender',
        height: this.height,
        lastName: this.lastName,
        pulseRate: this.pulseRate,
        respirationRate: this.respirationRate,
        vacationBalance: this.vacationBalance,
        weight: this.weight,
      });
    }
    else if (this.gender === 3)
    {
      const employeeResponse = await entities.employee.add({
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
        bloodPressure: this.bloodPressure,
        bodyTemperature: this.bodyTemp,
        firstName: this.firstName,
        gender: 'NonBinaryOrNonConfirming',
        height: this.height,
        lastName: this.lastName,
        pulseRate: this.pulseRate,
        respirationRate: this.respirationRate,
        vacationBalance: this.vacationBalance,
        weight: this.weight,
      });
    }
    else if (this.gender === 4)
    {
      const employeeResponse = await entities.employee.add({
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
        bloodPressure: this.bloodPressure,
        bodyTemperature: this.bodyTemp,
        firstName: this.firstName,
        gender: 'PreferNotToRespond',
        height: this.height,
        lastName: this.lastName,
        pulseRate: this.pulseRate,
        respirationRate: this.respirationRate,
        vacationBalance: this.vacationBalance,
        weight: this.weight,
      });
    }
  }


  onSelected(value: string)
  {
    if('Male' == value)
    {
      this.gender = 0;
    }
    else if('Female' == value)
    {
      this.gender = 1;
    }
    else if('Transgender' == value)
    {
      this.gender = 2;
    }
    else if('NonBinaryOrNonConfirming' == value)
    {
      this.gender = 3;
    }
    else
    {
      this.gender = 4;
    }
  }
}
