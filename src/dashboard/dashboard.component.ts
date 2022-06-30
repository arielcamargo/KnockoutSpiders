import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {createVendiaClient} from "@vendia/client";
import { Router} from "@angular/router";
import {delay, map} from "rxjs";


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
  testOutput: any;
  testing: any;
  ageArr: number[] = [];
  constructor(private router: Router) {
  }


  genders: string[] = ['female', 'male', 'male', 'male', 'non-binary', 'female', 'non-binary', 'prefer not to answer'];

  malePercentage;
  femalePercentage;
  employeeBoxClasses;
  async ngOnInit()
  {
    this.employeeBoxClasses = ['col', 'col-9', 'main__filters-item', 'btn'];
    this.customTesting().then();

    let totalAge = 0;
    let averageAge = 0;
    let totalWeight = 0;
    let averageWeight = 0;
    let totalHeight = 0;
    let averageHeight = 0;
    let totalBloodPressure = 0;
    let averageBloodPressure = 0;
    let totalPulseRate = 0;
    let averagePulseRate = 0;
    let totalHrExercisePerWeek = 0;
    let averageHrExercisePerWeek = 0;
    let totalVacationBalance = 0;
    let averageVacationBalance = 0;
    let totalHrWorkPerWeek = 0;
    let averageHrWorkPerWeek = 0;
    let totalBodyTemp = 0;
    let averageBodyTemp = 0;
    let totalRespirationRate = 0;
    let averageRespirationRate = 0;
    let totalEmployeeCount = 0;
    let allGenders = '';

    let maleCounter = 0;
    let femaleCounter = 0;
    let transCounter= 0;
    let preferNotToRespondCounter = 0;
    let nonBinaryOrNonConfirmingCounter = 0;

    let malePercentage = 0;
    let femalePercentage = 0;
    let transPercentage= 0;
    let preferNotToRespondPercentage = 0;
    let nonBinaryOrNonConfirmingPercentage = 0;


    this.customTesting().then(data => {
       for(let i = 0;i < data.items.length;i++){
        totalAge += data.items[i].age!;
        totalWeight += data.items[i].weight!;
        totalHeight += data.items[i].height!;
        totalBloodPressure += Number(data.items[i].bloodPressure);
        totalPulseRate += data.items[i].pulseRate;
        totalHrExercisePerWeek += data.items[i].avgHourseOfExercisePerWeek;
        totalVacationBalance += data.items[i].vacationBalance;
        totalHrWorkPerWeek += data.items[i].avgHourseOfWorkPerWeek;
        totalBodyTemp += data.items[i].bodyTemperature;
        totalRespirationRate += data.items[i].respirationRate;
        allGenders += data.items[i].gender;
        this.ageArr[i] = (data.items[i].age);
        if(data.items[i].gender === "Man"){
            maleCounter++;
        }
        else if(data.items[i].gender === "Woman") {
            femaleCounter++;
        }
        else if(data.items[i].gender === "Transgender") {
            transCounter++;
        }
        else if(data.items[i].gender === "NonBinaryOrNonConfirming") {
            preferNotToRespondCounter++;
        }
       else if(data.items[i].gender === "PreferNotToRespond") {
            nonBinaryOrNonConfirmingCounter++;

        }
      }

      averageAge = Number((totalAge/data.items.length).toFixed(2));
      averageWeight = Number((totalWeight/data.items.length).toFixed());
      averageHeight = Number((totalHeight/data.items.length).toFixed(2));
      averageBloodPressure = Number((totalBloodPressure/data.items.length).toFixed(2));
      averagePulseRate = Number((totalPulseRate/data.items.length).toFixed(2));
      averageHrExercisePerWeek = Number((totalHrExercisePerWeek/data.items.length).toFixed(2));
      averageVacationBalance = Number((totalVacationBalance/data.items.length).toFixed(2));
      averageHrWorkPerWeek = Number((totalHrWorkPerWeek/data.items.length).toFixed(2));
      averageBodyTemp = Number((totalBodyTemp/data.items.length).toFixed(2));
      averageRespirationRate = Number((totalRespirationRate/data.items.length).toFixed(2));
      totalEmployeeCount = Number((data.items.length).toFixed(2));

      malePercentage = Number(((maleCounter/totalEmployeeCount) * 100).toFixed(2));
      femalePercentage = Number(((femaleCounter/totalEmployeeCount) * 100).toFixed(2));
      transPercentage = Number(((transCounter/totalEmployeeCount) * 100).toFixed(2));
      nonBinaryOrNonConfirmingPercentage = Number(((nonBinaryOrNonConfirmingCounter/totalEmployeeCount) * 100).toFixed(2));
      preferNotToRespondPercentage = Number(((preferNotToRespondCounter/totalEmployeeCount) * 100).toFixed(2));
      this.testing = {
        Age: averageAge,
        Weight: averageWeight,
        Height: averageHeight,
        TotalEmployee: totalEmployeeCount,
        BloodPressure: averageBloodPressure,
        PulseRate: averagePulseRate,
        ExercisePerWeek: averageHrExercisePerWeek,
        VacationBalance: averageVacationBalance,
        WorkPerWeek: averageHrWorkPerWeek,
        BodyTemp: averageBodyTemp,
        RespirationRate: averageRespirationRate,
        Mpercent: malePercentage,
        Fpercent: femalePercentage,
        Transpercent: transPercentage,
        NonBinaryPerdent: nonBinaryOrNonConfirmingPercentage,
        preferNotToRespond: preferNotToRespondPercentage,

      }

    })
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
    //  this.malePercentage = this.getPercentage( 'male', this.testing.genders);
    //  this.femalePercentage = this.getPercentage( 'female', this.testing.allGenders);
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
