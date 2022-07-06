import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {createVendiaClient} from "@vendia/client";
import { Router} from "@angular/router";

const client = createVendiaClient({

  apiUrl: `https://yxqvgk2bt0.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://q1gifqpt0f.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `2EuFYSt12j8YMm6jATQ7dTbYEPBDobikJc64fxKcG26H`,
});

const {entities} = client;

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteEmployeeComponent implements OnInit {

  data;
  fullNames: string[] = [];
  vendiaIds: string[] = [];

  constructor(private router: Router)
  {

  }

  async ngOnInit()
  {
    this.data = await this.customTesting();
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
      this.fullNames.push(this.data.items[i].firstName + " " + this.data.items[i].lastName);
    }
  }

  goToDashboard()
  {
    this.router.navigate(['']).then();
  }
}
