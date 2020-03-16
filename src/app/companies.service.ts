import { Injectable, CollectionChangeRecord } from '@angular/core';
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
  selectedCompany: Company;

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
    let incomesSum = 0;
    for (let value of incomesValues) {
      incomesSum += value
    }
    return incomesSum
  }

  incomeAverage(data, length) {
    let average = data/length
    return average;
  }

  incomeMounth(data, dateStart, dateEnd){
    let incomesValues = data.incomes.map(income => {
      let date = new Date(income.date);
      let dateN = date.getTime();
      if (dateN >= dateStart.getTime() && dateN <= dateEnd.getTime()){
        return +income.value;
      } else return null;
    })

    let selectIncomesSum = 0;
    for (let value of incomesValues) {
      selectIncomesSum += value}
    return selectIncomesSum;
    }
}
