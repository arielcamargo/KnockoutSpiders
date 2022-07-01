import { Component, OnInit } from '@angular/core';
import {createVendiaClient} from "@vendia/client";
import { Router} from "@angular/router";


//This should allow for the vendia client to work
//in this component. Change apikey to correct one.
const client = createVendiaClient({

  apiUrl: `https://z2z10z6138.execute-api.us-west-1.amazonaws.com/graphql/`,
  websocketUrl: `wss://ssope56ubl.execute-api.us-west-1.amazonaws.com/graphql`,
  apiKey: `naUSK3QaBR8gPJcjj8N8diBaDNcuBdSe9UgDooCJciD`,
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
  bloodPressures: number[] = [];
  respRates: number[] = [];
  weights: number[] = [];
  exerciseHours: number[] = [];
  vacationHours: number[] = [];
  workHours: number[] = [];
  stringOutput;

  constructor(private router: Router) { }

  async ngOnInit()
  {
    this.data = await this.customTesting();
    this.dataInitialization();
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
      this.ids.push(i + 1);
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.fullNames.push(this.data.items[i].firstName + " " + this.data.items[i].lastName);
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.ages.push(this.data.items[i].age);
    }

    for(let i = 0; i < this.data.items.length; i++)
    {
      this.genders.push(this.data.items[i].gender);
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
      this.bloodPressures.push(Number(this.data.items[i].bloodPressure));
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
  }

  goToAddEmployee()
  {
    this.router.navigate(['add-employee']).then();
  }

  outputString(index: number)
  {
    return this.ids[index] + " " + this.fullNames[index] + " " + this.ages[index] + " " +
      this.genders[index] + " " + this.heights[index] + " " + this.temperatures[index] + " " +
      this.pulseRates[index] + " " + this.respRates[index] + " " + this.weights[index] + " " +
      this.exerciseHours[index] + " " + this.vacationHours[index] + " " + this.workHours[index];
  }

}
