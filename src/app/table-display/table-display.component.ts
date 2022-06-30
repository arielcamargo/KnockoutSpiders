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
  
  constructor(private router: Router) { }
  
  arrayObj: object[] = [];
  test = 0;
  ngOnInit()
  {
    async function customTesting() {
      console.log('works???');
      // @ts-ignore
      const employeeResponse = await entities.employee.list();
      return employeeResponse;
  }

  let firstName= "";
  let lastName= "";
  let age = 0;
  let gender = "";
  let weight = 0;
  let height = 0;
  let bloodPressure = 0;
  let pulseRate = 0;
  let exercisePerWeek = 0;
  let vacationBalance = 0;
  let workPerWeek = 0;
  let bodyTemp = 0;
  let respirationRate = 0;
  customTesting().then(data => {
    for(let i = 0;i < data.items.length;i++){
      let obj = {
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        weight: 0,
        height: 0,
        bloodPressure: "",
        pulseRate: 0,
        exercisePerWeek: 0,
        vacationBalance: 0,
        workPerWeek: 0,
        bodyTemp: 0,
        respirationRate: 0,
      }
      obj.firstName = data.items[i].firstName;
      obj.lastName = data.items[i].lastName;
      obj.age = data.items[i].age;
      obj.gender = data.items[i].gender;
      obj.weight = data.items[i].weight;
      obj.height = data.items[i].height;
      obj.bloodPressure = data.items[i].bloodPressure;
      obj.pulseRate = data.items[i].pulseRate;
      obj.exercisePerWeek = data.items[i].avgHourseOfExercisePerWeek;
      obj.vacationBalance = data.items[i].vacationBalance;
      obj.workPerWeek = data.items[i].avgHourseOfWorkPerWeek;
      obj.bodyTemp = data.items[i].bodyTemperature;
      obj.respirationRate = data.items[i].respirationRate;
  
      this.arrayObj[i] = obj;
    }
    console.log(this.arrayObj);
  }
  
  
)
}
}
