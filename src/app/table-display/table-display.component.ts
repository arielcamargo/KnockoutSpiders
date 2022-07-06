import { Component, OnInit } from '@angular/core';
import {createVendiaClient} from "@vendia/client";
import { Router} from "@angular/router";


//This should allow for the vendia client to work
//in this component. Change apikey to correct one.
const client = createVendiaClient({

  apiUrl: `https://yxqvgk2bt0.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://q1gifqpt0f.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `2EuFYSt12j8YMm6jATQ7dTbYEPBDobikJc64fxKcG26H`,
});

const {entities} = client;

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css'],
})
export class TableDisplayComponent implements OnInit {

  data;
  ids: number[] = [];
  ages: number[] = [];
  fullNames: string[] = [];
  genders: string[] = [];
  heights: number[] = [];
  temperatures: number[] = [];
  pulseRates: number[] = [];
  diastolicPressure: number[] = [];
  systolicPressure: number[] = [];
  bloodPressure: string[] = [];
  respRates: number[] = [];
  weights: number[] = [];
  exerciseHours: number[] = [];
  vacationHours: number[] = [];
  workHours: number[] = [];
  stringOutput;
  allIds: number[] = [];
  maleIds: number[] = [];
  femaleIds: number[] = [];
  transIds: number[] = [];
  nonBIds: number[] = [];
  noRIds: number[] = [];

  constructor(private router: Router) { }

  async ngOnInit()
  {
    this.data = await this.customTesting();
    this.dataInitialization();
    this.idInitialization();
  }

  async customTesting()
  {
    // @ts-ignore
    const employeeResponse = await entities.employee.list();
    return employeeResponse;
  }

  dataInitialization()
  {
    for(let i = 0; i < this.data.items.length; i++)
    {
      this.ids.push(i);
      this.allIds.push(i);
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.fullNames.push(this.data.items[i].firstName + " " + this.data.items[i].lastName);
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.ages.push(this.data.items[i].age);
    }

    for (let i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i].gender === "PreferNotToRespond") {
        this.genders.push("No Response");
      }
      else if (this.data.items[i].gender === "NonBinaryOrNonConfirming") {
        this.genders.push("Non Binary");
      }
      else if(this.data.items[i].gender === "Man")
      {
        this.genders.push("Male");
      }
      else if(this.data.items[i].gender === "Woman")
      {
        this.genders.push("Female");
      }
       else {
        this.genders.push(this.data.items[i].gender);
      }
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.heights.push(this.data.items[i].height);
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.temperatures.push(this.data.items[i].bodyTemperature);
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.pulseRates.push(Number(this.data.items[i].pulseRate));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.weights.push(Number(this.data.items[i].weight));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.diastolicPressure.push(Number(this.data.items[i].DiastolicPressure));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.systolicPressure.push(Number(this.data.items[i].SystolicPressure));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.respRates.push(Number(this.data.items[i].respirationRate));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.exerciseHours.push(Number(this.data.items[i].avgHourseOfExercisePerWeek));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.vacationHours.push(Number(this.data.items[i].vacationBalance));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.workHours.push(Number(this.data.items[i].avgHourseOfWorkPerWeek));
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.bloodPressure.push(this.systolicPressure[i] + "/" + this.diastolicPressure[i]);
    }
  }

  idInitialization()
  {
    for(let i = 0; i < this.data.items.length; i++)
    {
      if(this.genders[i] == 'Male')
        this.maleIds.push(i);
      else if(this.genders[i] == 'Female')
        this.femaleIds.push(i);
      else if(this.genders[i] == 'Transgender')
        this.transIds.push(i);
      else if(this.genders[i] == 'Non Binary')
        this.nonBIds.push(i);
      else
        this.noRIds.push(i);
    }
  }

  goToAddEmployee()
  {
    this.router.navigate(['add-employee']).then();
  }

  outputFullName(index: number)
  {
    return this.fullNames[index];
  }

  outputAge(index: number)
  {
    return this.ages[index];
  }

  outputGender(index: number)
  {
    return this.genders[index];
  }


  outputHeight(index:number)
  {
    return this.heights[index];
  }

  outputTemp(index:number)
  {
    return this.temperatures[index];
  }

  outputPulse(index:number)
  {
    return this.pulseRates[index];
  }

  outputPressure(index:number)
  {
    return this.bloodPressure[index];
  }

  outputResp(index:number)
  {
    return this.pulseRates[index];
  }

  outputWeight(index:number)
  {
    return this.weights[index];
  }

  outputExercise(index:number)
  {
    return this.exerciseHours[index];
  }

  outputVacation(index:number)
  {
    return this.vacationHours[index];
  }

  outputWorkHours(index:number)
  {
    return this.workHours[index];
  }
  outputString(index: number)
  {
    return this.ids[index] + " " + this.fullNames[index] + " " + this.ages[index] + " " +
      this.genders[index] + " " + this.heights[index] + " " + this.temperatures[index] + " " +
      this.pulseRates[index] + " " + this.respRates[index] + " " + this.weights[index] + " " +
      this.exerciseHours[index] + " " + this.vacationHours[index] + " " + this.workHours[index];
  }

  onSelected(value: string)
  {
    if('All' == value)
    {
      this.ids = this.allIds;
    }
    if('Male' == value)
    {
      this.ids = this.maleIds;
    }
    else if('Female' == value)
    {
      this.ids = this.femaleIds;
    }
    else if('Transgender' == value)
    {
      this.ids = this.transIds;
    }
    else if('Non-Binary' == value)
    {
      this.ids = this.nonBIds;
    }
    else if('PreferNotToRespond' == value)
    {
      this.ids = this.noRIds;
    }
    else
    {
      this.ids = this.allIds;
    }
  }

  goToUpdateEmployee()
  {
    this.router.navigate(['delete-employee']).then();
  }
}
// here
