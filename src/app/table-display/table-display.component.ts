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
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit {

  constructor(private router: Router) { }
  ageArr: number[];
  test = 0;
  ngOnInit()
  {

  }

  async customTesting()
  {
    // @ts-ignore
    const employeeResponse = await entities.employee.list();
    return employeeResponse;
  }

}
