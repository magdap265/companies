import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  selectedCompany: Company = {id: null, city: null, name: null};
  incomesByCompanyId = null;
  totalIncome: number;
  averageIncome: number;
  mounthIncome;


  constructor(
    private companiesService: CompaniesService,
    private activedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {

    this.activedRoute.paramMap.subscribe(params => {
      let id = +params.get('companyId')
      this.getCompanyById(id)
      this.getIncomeById(id)
    })  
  }
  
  getCompanyById(id: number): void {
    this.companiesService.getCompanies()
      .subscribe(companies => {
        this.selectedCompany = companies.find(c => c.id === id);
      })
  }

  getIncomeById(id: number) {
    this.companiesService.getIncomeById(id)
      .subscribe(incomes=> {
      this.incomesByCompanyId = incomes
      this.totalIncome = Math.round(this.companiesService.incomeSum(this.incomesByCompanyId)*100)/100
      this.averageIncome = Math.round(this.companiesService.incomeAverage(this.totalIncome, this.incomesByCompanyId.incomes.length)*100)/100
      this.mounthIncome = Math.round(this.companiesService.incomeMounth(this.incomesByCompanyId, new Date('2019-02-03T22:28:40.818Z'),new Date('2019-09-13T23:16:03.471Z'))*100)/100
  })
  }
}