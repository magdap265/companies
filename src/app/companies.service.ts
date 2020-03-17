import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from './company.model';
// import { Income } from './income.model';

const apiUrl = 'https://recruitment.hal.skygate.io';

@Injectable({  
  providedIn: 'root'
})
export class CompaniesService {
  companiesList: Company[];
  selectedCompany: Company = {id: null, city: null, name: null};
  incomesByCompanyId = null;
  totalIncome: number;
  averageIncome: number;
  mounthIncome:number;
  incomesByData;

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${apiUrl}/companies`)    
  }

  getIncomeById(id: number): Observable<{}> {
    return this.http.get<{}>(`${apiUrl}/incomes/${id}`);
  }

  incomeSum(data) {
    let incomesValues = data.incomes.map(income => {
      return  +income.value
    })
    let incomesSum = 0
    for (let value of incomesValues) {
      incomesSum += value
    }
    return Math.round(incomesSum*100)/100
  }

  incomeSumByDate(data, dateStart, dateEnd) {
    let incomesValues = data.incomes.map(income => {
      let date = new Date(income.date)
      let dateInNumber = date.getTime()
      dateStart = new Date(dateStart)
      dateEnd = new Date(dateEnd)
      if (dateInNumber >= dateStart.getTime() && dateInNumber <= dateEnd.getTime()){
        return +income.value
      } else return null
    })
    let incomesSum = 0
    for (let value of incomesValues) {
      incomesSum += value
    }
    this.incomesByData = incomesValues.filter(Boolean)
    return Math.round(incomesSum*100)/100
  }

  incomeAverage(data, length) {
    let average = data/length
    return Math.round(average*100)/100
  }

  incomeSumByMounth(data, dateStart, dateEnd){
    let incomesValues = data.incomes.map(income => {
      let date = new Date(income.date)
      let dateN = date.getTime()
      if (dateN >= dateStart.getTime() && dateN <= dateEnd.getTime()){
        return +income.value
      } else return null
    })

    let incomesSum = 0
    for (let value of incomesValues) {
      incomesSum += value}
    return Math.round(incomesSum*100)/100
    }
}
