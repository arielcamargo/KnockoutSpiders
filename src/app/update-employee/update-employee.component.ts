import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(private router: Router)
  {

  }

  ngOnInit()
  {
  }

  goToDashboard()
  {
    this.router.navigate(['']).then();
  }

}
