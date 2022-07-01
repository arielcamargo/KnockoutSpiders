import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class DashboardComponent implements OnInit
{



  constructor(private router: Router) {
  }


  genderTypes: string[] = ['female', 'male', 'male', 'male', 'non-binary', 'female', 'non-binary', 'prefer not to answer'];

  genders: any = [];
  data: any;
  testing: any;
  ids: number[] = [];
  vacationHours: number[] = [];
  weights: number[] = [];
  ages: number[] = [];
  heights: number[] = [];
  temperatures: number[] = [];
  pulseRates: number[] = [];
  exerciseHours: number[] = [];
  bloodPressures: any = [];
  workHours: number[] = [];
  respRates: number[] = [];
  malePercentage;
  femalePercentage;
  employeeBoxClasses;
  transPercentage: any;
  nonBinaryOrNonConfirmingPercentage: any;
  preferNotToRespondPercentage: any;
  avgHeight;
  async ngOnInit()
  {
    this.data = await this.customTesting();
    this.dataInitialization()
    this.calculations()
    this.employeeBoxClasses = ['col', 'col-9', 'main__filters-item', 'btn'];

    this.testing = {
      Age: this.getAverage(this.ages),
      Weight: this.getAverage(this.weights),
      Height: this.getAverage(this.heights),
      TotalEmployee: this.data.items.length,
      BloodPressure: this.getAverage(this.bloodPressures),
      PulseRate: this.getAverage(this.pulseRates),
      ExercisePerWeek: this.getAverage(this.exerciseHours),
      VacationBalance: this.getAverage(this.vacationHours),
      WorkPerWeek: this.getAverage(this.workHours),
      BodyTemp: this.getAverage(this.temperatures),
      RespirationRate: this.getAverage(this.respRates),
      Mpercent: this.malePercentage,
      Fpercent: this.femalePercentage,
      Transpercent: this.transPercentage,
      NonBinaryPercent: this.nonBinaryOrNonConfirmingPercentage,
      preferNotToRespond: this.preferNotToRespondPercentage,

    }
  }

  async customTesting()
  {
    // @ts-ignore
    const employeeResponse = await entities.employee.list();
    return employeeResponse;
  }

  //Author:Ariel Camargo
  calculations()
  {
     this.malePercentage = this.getPercentage( 'Man', this.genders);
     this.femalePercentage = this.getPercentage( 'Woman', this.genders);
     this.transPercentage = this.getPercentage( 'Transgender', this.genders);
     this.nonBinaryOrNonConfirmingPercentage = this.getPercentage('NonBinaryOrNonConfirming', this.genders);
     this.preferNotToRespondPercentage = this.getPercentage('PreferNotToRespond', this.genders);
  }

  dataInitialization()
  {
    for(let i = 0; i < this.data.items.length; i++)
    {
      this.ids.push(i + 1);
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

  //Author: Ariel Camargo
  //Given an array, the standard deviation is returned.
  getStandardDeviation(data:number[])
  {
    let average = this.getAverage(data);
    let standardDeviation = 0.0;
    for(let i = 0; i < data.length; i++)
    {
      standardDeviation += Math.pow((data[i] - average), 2);
    }
    standardDeviation /= data.length;
    standardDeviation = Math.sqrt(standardDeviation);
    return standardDeviation;
  }

  //Author: Ariel Camargo
  //Given an array, the average is returned.
  getAverage(data:number[])
  {
    let average = 0.0;
    for(let i = 0; i < data.length; i++)
    {
      average += data[i];
    }
    average /= data.length;
    return average;
  }

  //Author: Ariel Camargo
  //Given an array and a term, calculate how many instances
  //that term occurs in said array.
  //Return a string in XX.X% format.
  getPercentage(searchedValue: string, data:string[])
  {
    let returnedValue = 0.0;
    let counter = 0;
    let returnedValueString = '';
    for(let i = 0; i  < data.length; i++)
    {
      if(data[i] == searchedValue)
        counter++;
    }
    returnedValue = (counter * 1.0) / (data.length * 1.0);
    returnedValue *= 100.0;
    returnedValueString = returnedValue.toFixed(1) + '%';
    return returnedValueString;
  }

  getMedian(data:number[])
  {
    let orderedArr: number[] = this.sortNumArrAsc(data);
    if(orderedArr.length % 2 == 1)
    {
      return orderedArr[((orderedArr.length - 1) / 2)];
    }
    else
    {
      return (orderedArr[orderedArr.length / 2] + orderedArr[(orderedArr.length / 2) - 1]) / 2;
    }
  }

  // //given an array returns value that shows up the most, does not handle if there are duplicate modes

  getMode(data: any[])
  {
    let tempArr: any[] = data.sort();

    let testHash = new Map<any, number>();
    for (let i = 0; i < tempArr.length; i++) {
      if(testHash.has(tempArr[i]) == false){
        testHash.set(tempArr[i], 1);
      }else{
        testHash.set(tempArr[i], testHash.get(tempArr[i]) as number+1);
      }
    }
    return Array.from(testHash.entries()).reduce((a, b) => a[1] < b[1] ? b : a)[0];

  }

  sortNumArrAsc(data:number[])
  {
    let orderedArr: number[] = data;
    for(let i = 0; i < orderedArr.length; i++)
    {
      for(let j = 1; j < orderedArr.length; j++)
      {
        if(orderedArr[i] > orderedArr[j])
        {
          let temp = orderedArr[j];
          orderedArr[j] = orderedArr[i];
          orderedArr[i] = temp;
        }
      }
    }
    return orderedArr;
  }

  onHighlightClick()
  {
    this.employeeBoxClasses = ['col', 'col-9', 'main__filters-item', 'btn', 'main__filters-item--active'];

  }

  goToAddEmployee()
  {
    this.router.navigate(['add-employee']).then();
  }

  goToTable()
  {
    this.router.navigate(['table-display']).then();
  }
}
