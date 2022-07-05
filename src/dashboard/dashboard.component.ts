import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class DashboardComponent implements OnInit
{



  constructor(private router: Router) {
  }


  // genderTypes: string[] = ['female', 'male', 'male', 'male', 'non-binary', 'female', 'non-binary', 'prefer not to answer'];

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
  diastolicPressure: number[] = [];
  systolicPressure: number[] = [];
  bloodPressure: any[] = [];
  workHours: number[] = [];
  respRates: number[] = [];
  malePercentage: any;
  femalePercentage: any;
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

    let averageAge = this.getAverage(this.ages).toFixed(2);
    let averageWeight = this.getAverage(this.weights).toFixed(2);
    let averageHeight = this.getAverage(this.heights).toFixed(2);
    let averageDiastolicPressure = this.getAverage(this.diastolicPressure).toFixed(2);
    let averageSystolicPressure = this.getAverage(this.systolicPressure).toFixed(2);
    let averagePulseRate = this.getAverage(this.pulseRates).toFixed(2);
    let averageHrExercisePerWeek = this.getAverage(this.exerciseHours).toFixed(2);
    let averageVacationBalance = this.getAverage(this.vacationHours).toFixed(2);
    let averageHrWorkPerWeek = this.getAverage(this.workHours).toFixed(2);
    let averageBodyTemp = this.getAverage(this.temperatures).toFixed(2);
    let averageRespirationRate = this.getAverage(this.respRates).toFixed(2);
    let totalEmployeeCount = 0;

    let maleCounter = 0;
    let femaleCounter = 0;
    let transCounter= 0;
    let preferNotToRespondCounter = 0;
    let nonBinaryOrNonConfirmingCounter = 0;

    let maleWorkMoreThanFortyHours = 0;
    let femaleWorkMoreThanFortyHours = 0;
    let transWorkMoreThanFortyHours = 0;
    let noneBinaryWorkMoreThanFortyHours = 0;
    let preferNottoSayWorkMoreThanFortyHours = 0;

    let maleWorkMoreThanFortyHoursPercent = 0;
    let femaleWorkMoreThanFortyHoursPercent = 0;
    let transWorkMoreThanFortyHoursPercent = 0;
    let noneBinaryWorkMoreThanFortyHoursPercent = 0;
    let preferNotoSayWorkMoreThanFortyHoursPercent = 0;

    this.customTesting().then(data => {
      for(let i = 0;i < data.items.length;i++){
        if(data.items[i].gender === "Man"){
            maleCounter++;
            if(data.items[i].avgHourseOfWorkPerWeek > 40){
              maleWorkMoreThanFortyHours++;
            }
        }
        else if(data.items[i].gender === "Woman") {
            femaleCounter++;
            if(data.items[i].avgHourseOfWorkPerWeek > 40){
              femaleWorkMoreThanFortyHours++;
            }
        }
        else if(data.items[i].gender === "Transgender") {
            transCounter++;
            if(data.items[i].avgHourseOfWorkPerWeek > 40){
              transWorkMoreThanFortyHours++;
            }
        }
        else if(data.items[i].gender === "NonBinaryOrNonConfirming") {
            nonBinaryOrNonConfirmingCounter++;
            if(data.items[i].avgHourseOfWorkPerWeek > 40){
              noneBinaryWorkMoreThanFortyHours++;
            }
        }
        else if(data.items[i].gender === "PreferNotToRespond") {
            preferNotToRespondCounter++;
            if(data.items[i].avgHourseOfWorkPerWeek > 40){
              preferNottoSayWorkMoreThanFortyHours++;
            }
        }
      }

      totalEmployeeCount = Number((data.items.length).toFixed(2));

      maleWorkMoreThanFortyHoursPercent = Number(((maleWorkMoreThanFortyHours/maleCounter) * 100).toFixed(2));
      femaleWorkMoreThanFortyHoursPercent = Number(((femaleWorkMoreThanFortyHours/femaleCounter) * 100).toFixed(2));
      transWorkMoreThanFortyHoursPercent = Number(((transWorkMoreThanFortyHours/transCounter) * 100).toFixed(2));
      noneBinaryWorkMoreThanFortyHoursPercent = Number(((noneBinaryWorkMoreThanFortyHours/nonBinaryOrNonConfirmingCounter) * 100).toFixed(2));
      preferNotoSayWorkMoreThanFortyHoursPercent = Number(((preferNottoSayWorkMoreThanFortyHours/preferNotToRespondCounter) * 100).toFixed(2));

      let standardDeviationAge = this.getStandardDeviation(this.ages).toFixed(2);
      let standardDeviationHeight = this.getStandardDeviation(this.heights).toFixed(2);
      let standardDeviationWeight = this.getStandardDeviation(this.weights).toFixed(2);
      let standardDeviationSP = this.getStandardDeviation(this.systolicPressure).toFixed(2);
      let standardDeviationDP = this.getStandardDeviation(this.diastolicPressure).toFixed(2);
      let standardDeviationBP = `${standardDeviationSP}/${standardDeviationDP}`
      let standardDeviationBT = this.getStandardDeviation(this.temperatures).toFixed(2);
      let standardDeviationPulse = this.getStandardDeviation(this.pulseRates).toFixed(2);
      let standardDeviationResp = this.getStandardDeviation(this.respRates).toFixed(2);
      let standardDeviationWklyE = this.getStandardDeviation(this.exerciseHours).toFixed(2);
      let standardDeviationVB = this.getStandardDeviation(this.vacationHours).toFixed(2);
      let standardDeviationWH = this.getStandardDeviation(this.workHours).toFixed(2);

      if(femaleCounter == 0)
      {
        femaleWorkMoreThanFortyHoursPercent = 0.0;
      }
      if(maleCounter == 0)
      {
        maleWorkMoreThanFortyHoursPercent = 0.0;
      }
      if(transCounter == 0)
      {
        transWorkMoreThanFortyHoursPercent = 0.0;
      }
      if(nonBinaryOrNonConfirmingCounter == 0)
      {
        noneBinaryWorkMoreThanFortyHoursPercent = 0.0;
      }
      if(preferNotToRespondCounter == 0)
      {
        preferNotoSayWorkMoreThanFortyHoursPercent = 0.0;
      }

      this.testing = {

        StandardDeviationAge: standardDeviationAge,
        StandardDeviationHeight: standardDeviationHeight,
        StandardDeviationWeight: standardDeviationWeight,
        StandardDeviationBP: standardDeviationBP,
        StandardDeviationBT: standardDeviationBT,
        StandardDeviationPulse: standardDeviationPulse,
        StandardDeviationResp: standardDeviationResp,
        StandardDeviationWklyE: standardDeviationWklyE,
        StandardDeviationVB: standardDeviationVB,
        StandardDeviationWH: standardDeviationWH,

        Age: averageAge,
        Weight: averageWeight,
        Height: averageHeight,
        TotalEmployee: totalEmployeeCount,
        BloodPressure: averageDiastolicPressure + "/" + averageSystolicPressure,
        PulseRate: averagePulseRate,
        ExercisePerWeek: averageHrExercisePerWeek,
        VacationBalance: averageVacationBalance,
        WorkPerWeek: averageHrWorkPerWeek,
        BodyTemp: averageBodyTemp,
        RespirationRate: averageRespirationRate,
        Mpercent: this.malePercentage,
        Fpercent: this.femalePercentage,
        Transpercent: this.transPercentage,
        NonBinaryPercent: this.nonBinaryOrNonConfirmingPercentage,
        preferNotToRespond: this.preferNotToRespondPercentage,


        MaleFortyHourAWeek: maleWorkMoreThanFortyHoursPercent,
        FemaleFortyHourAWeek: femaleWorkMoreThanFortyHoursPercent,
        TransFortyHoursAWeek: transWorkMoreThanFortyHoursPercent,
        NoneBinaryFortyHourAWeek: noneBinaryWorkMoreThanFortyHoursPercent,
        preferNToSayFortyHourAweek: preferNotoSayWorkMoreThanFortyHoursPercent,

      }

    }
    )
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
