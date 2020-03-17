import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  selectedCompany: Company = {id: null, city: null, name: null};
  incomesByCompanyId = null;
  totalIncome: number;
  averageIncome: number;
  averageIncomeByData: number;
  mounthIncome;
  incomeSumByDate: number;
  incomesByData
  dateStart = new Date('01-01-2018');
  dateEnd = new Date();
  today = new Date();
  lastMonthStart = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  lastMonthEnd = new Date(this.today.getFullYear(), this.today.getMonth()+1);
  
  constructor(
    private companiesService: CompaniesService,
    private activedRoute: ActivatedRoute) {}

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
        this.selectedCompany = companies.find(c => c.id === id)
      })
  }

  getIncomeById(id: number) {
    this.companiesService.getIncomeById(id)
      .subscribe(incomes=> {
      this.incomesByCompanyId = incomes
      this.totalIncome = this.companiesService.incomeSum(this.incomesByCompanyId)
      this.averageIncome = this.companiesService.incomeAverage(this.totalIncome, this.incomesByCompanyId.incomes.length)
      this.mounthIncome = this.companiesService.incomeSumByMounth(this.incomesByCompanyId, this.lastMonthStart, this.lastMonthEnd)
      this.incomeSumByDate = this.companiesService.incomeSumByDate(this.incomesByCompanyId, this.dateStart, this.dateEnd)
      this.averageIncomeByData = this.companiesService.incomeAverage(this.incomeSumByDate, this.companiesService.incomesByData.length)
  })
  }

  setDateStart(date) {
    this.dateStart = date.target.value
    this.dateStart && this.dateEnd ? 
    this.incomeSumByDate = this.companiesService.incomeSumByDate(this.incomesByCompanyId, this.dateStart, this.dateEnd) : null
    this.companiesService.incomesByData.length !== 0 ? 
    this.averageIncomeByData = this.companiesService.incomeAverage(this.incomeSumByDate, this.companiesService.incomesByData.length) : this.averageIncomeByData = 0

  }

  setDateEnd(date) {
    this.dateEnd = date.target.value
    this.dateStart && this.dateEnd ? 
    this.incomeSumByDate = this.companiesService.incomeSumByDate(this.incomesByCompanyId, this.dateStart, this.dateEnd) : null
    this.companiesService.incomesByData.length !== 0 ? 
    this.averageIncomeByData = this.companiesService.incomeAverage(this.incomeSumByDate, this.companiesService.incomesByData.length): this.averageIncomeByData = 0
  }
}