import {Component, OnInit} from '@angular/core';
import {createVendiaClient} from "@vendia/client";
import { Router} from "@angular/router";
import { TestingComponent } from 'src/app/components/testing/testing.component';


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
  styleUrls: ['./dashboard.component.css', '../assets/fonts/fontawesome-free-6.1.1-web/css/all.min.css']

})

export class DashboardComponent implements OnInit
{
  testing: any;
  constructor(private router: Router) {
  }
  
  
  genders: string[] = ['female', 'male', 'male', 'male', 'non-binary', 'female', 'non-binary', 'prefer not to answer'];
  
  malePercentage;
  femalePercentage;
  employeeBoxClasses;


  ngOnInit()
  {
    this.calculations();
    this.employeeBoxClasses = ['col', 'col-9', 'main__filters-item', 'btn'];

    async function customTesting() {
      console.log('works???');
      const employeeResponse = await entities.employee.list();
      return employeeResponse;
    }
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
  
    customTesting().then(data => {
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
      }

      averageAge = totalAge/data.items.length;
      averageWeight = totalWeight/data.items.length;
      averageHeight = totalHeight/data.items.length;
      averageBloodPressure = totalBloodPressure/data.items.length;
      averagePulseRate = totalPulseRate/data.items.length;
      averageHrExercisePerWeek = totalHrExercisePerWeek/data.items.length;
      averageVacationBalance = totalVacationBalance/data.items.length;
      averageHrWorkPerWeek = totalHrWorkPerWeek/data.items.length;
      averageBodyTemp = totalBodyTemp/data.items.length;
      averageRespirationRate = totalRespirationRate/data.items.length;
      totalEmployeeCount = data.items.length;
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
        FPercent: this.femalePercentage,
      }
      
    
    })
    
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

  goToAddEmployeee()
  {
    this.router.navigate(['add-employee']);
  }
  
}
