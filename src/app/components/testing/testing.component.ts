import { Component, OnInit } from '@angular/core';
import { createVendiaClient } from '@vendia/client';
import { DashboardComponent } from 'src/dashboard/dashboard.component';



  const client = createVendiaClient({
    apiUrl: `https://z2z10z6138.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://ssope56ubl.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: `naUSK3QaBR8gPJcjj8N8diBaDNcuBdSe9UgDooCJciD`,
  });
  const { entities } = client;

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  testing: any;
  constructor() { }
  ngOnInit() {

    async function customTesting() {
      console.log('works???');
      // @ts-ignore
      const employeeResponse = await entities.employee.list();
      return employeeResponse;
    }
    let totalAge = 0;
    let averageAge = 0;
    let totalWeight = 0;
    let totalHeight = 0;
    customTesting().then(data => {
      for(let i = 0;i < data.items.length;i++){
        totalAge += data.items[i].age!;
        totalWeight += data.items[i].weight!;
        totalHeight += data.items[i].height!;
      }

      averageAge = totalAge/data.items.length;
      this.testing = {
        Age: averageAge,
        Weight: totalWeight,
        Height: totalHeight,
      }
    })
    // async function async() {

    //   const employeeResponse = await entities.employee.add({
    //     age: 14,
    //     avgHourseOfExercisePerWeek: 56,
    //     avgHourseOfWorkPerWeek: 67,
    //     bloodPressure: '78',
    //     bodyTemperature: 78,
    //     firstName: 'Gloria',
    //     gender: 'Woman',
    //     height: 1,
    //     lastName: 'Leone',
    //     pulseRate: 56,
    //     respirationRate: 45,
    //     vacationBalance: 15,
    //     weight: 156,
    //   });

    //   console.log(employeeResponse);
    // }

    // async function get() {
    //   console.log('works???');

    //   const employeeGet = await entities.employee.get('018182ed-df7f-434c-5f31-97c8c7564019');
    //   console.log(employeeGet);
    // }

    // async function customTesting() {
    //   console.log('works???');
    //   const employeeResponse = await entities.employee.list();
    //   return employeeResponse;


    // }
    // customTesting()
    // let fruits: Array<string>;
    // var averageAge = 0;
    // var totalAge = 0;
    // customTesting().then(data => {
    // for(let i = 0;i < data.items.length;i++){

    //   totalAge += data.items[i].age!;

    // }
    //   averageAge = totalAge/data.items.length;
    //   console.log(totalAge);

    // })
  }

}




    // console.log(averageAge);
    // customTesting().then(data => {
    //   for(let i = 0;i < data.items.length;i++){
    //     console.log(data.items[i].weight);
    //   }
    // })
    // async function list() {

    //   const employeeList = await entities.employee.list();


    // }

    // get();
    // async function getItems() {
    //   const responseTesting = await entities.employee.list();
    //   // return responseTesting;
    //   getAllAges(data:number[])
    //   {
    //     let average = 0.0;
    //     for(let i = 0; i < data.length; i++)
    //     {
    //       verage += data[i];
    //     }
    //     average /= data.length;
    //     return average;
    //   }
    //   // console.log(responseTesting.items[0].age);
    // }
    // getItems();
    // // const items = getItems();
    // console.log( items);
