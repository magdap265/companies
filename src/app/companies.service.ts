import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from './company.model';
// import { Income } from './income.model';

const apiUrl = 'https://recruitment.hal.skygate.io';

@Injectable({  
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${apiUrl}/companies`);
  }

  // getIncomeById(id: Number): Observable<Income[]> {
  //   return this.http.get<Income[]>(`${apiUrl}/incomes/${id}`);
  // }

}
