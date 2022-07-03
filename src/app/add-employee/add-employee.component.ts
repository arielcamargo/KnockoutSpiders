import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from "@angular/router";
import {createVendiaClient} from "@vendia/client";

const client = createVendiaClient({

  apiUrl: `https://yxqvgk2bt0.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://q1gifqpt0f.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `2EuFYSt12j8YMm6jATQ7dTbYEPBDobikJc64fxKcG26H`,
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
  DiastolicPressure: number = 100;
  SystolicPressure: number = 80;
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
        DiastolicPressure: this.DiastolicPressure,
        SystolicPressure: this.SystolicPressure,
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
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
        DiastolicPressure: this.DiastolicPressure,
        SystolicPressure: this.SystolicPressure,
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
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
        DiastolicPressure: this.DiastolicPressure,
        SystolicPressure: this.SystolicPressure,
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
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
        DiastolicPressure: this.DiastolicPressure,
        SystolicPressure: this.SystolicPressure,
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
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
        DiastolicPressure: this.DiastolicPressure,
        SystolicPressure: this.SystolicPressure,
        age: this.age,
        avgHourseOfExercisePerWeek: this.avgHoursExercise,
        avgHourseOfWorkPerWeek: this.avgHoursOfWo,
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
    else if('Non-Binary' == value)
    {
      this.gender = 3;
    }
    else
    {
      this.gender = 4;
    }
  }
}
