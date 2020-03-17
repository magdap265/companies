import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  companiesList: Company[];
  selectedCompany: Company;
  incomesByCompanyId = null;
  totalIncome: number;
  page: number = 0;
  limit: number = 10;
  pageLimit: number;
  disabledIncrement: boolean = false;
  disabledDecrement: boolean = true;
  companiesLength: number;
  incomesList: [];
  allData;
  searchName: string;
  currentData = null;


  constructor( 
    private companiesService: CompaniesService
  ) {
    this.selectedCompany = this.companiesService.selectedCompany;
  }

  ngOnInit(): void { 
    this.getCompanies(this.page * this.limit, this.limit)
  };

  getCompanies(skip: number, limit: number): void {
    this.companiesService.getCompanies()
      .subscribe(companies => {
        this.allData = companies;
        this.companiesList = companies.slice(skip, skip + limit);
        this.companiesLength = this.allData.length;
        this.pageLimit = Math.floor(this.companiesLength/limit);
        this.incomesList = this.allData.forEach(element => {
          this.getIncomeById(element.id)
        })
        
      });
  };

  getCompaniesFromLocal(skip: number, limit: number, data: []): void {
    this.companiesList = data.slice(skip, skip + limit);
  };

  getIncomeById(id: number): void {
    this.companiesService.getIncomeById(id)
      .subscribe(incomes=> {
      this.incomesByCompanyId = incomes
      this.totalIncome = Math.round(this.companiesService.incomeSum(this.incomesByCompanyId)*100)/100
      this.allData.find(c => c.id === id)['income'] = this.totalIncome
    })
  };

  incrementPage(): void {
    this.page++;
    this.disabledDecrement=false;
    this.page == this.pageLimit || (this.companiesLength % this.limit == 0 && this.page == this.pageLimit-1) ?
      this.disabledIncrement = true : this.disabledIncrement = false
    this.getCompaniesFromLocal(this.limit * this.page, this.limit, this.allData);
  }

  decrementPage(): void {
    this.page--;
    this.disabledIncrement = false;
    this.page == 0 ? this.disabledDecrement = true : this.disabledDecrement;
    this.getCompaniesFromLocal(this.limit * this.page, this.limit, this.allData);
  }

  sortByIncomeDescending(): void {
    this.allData = this.allData.sort((a,b) => {
      return a.income-b.income})
      this.getCompaniesFromLocal(this.page * this.limit, this.limit, this.allData)
    }

  sortByIncomeAscending(): void {
    this.allData = this.allData.sort((a,b) => {
      return b.income-a.income})
      this.getCompaniesFromLocal(this.page * this.limit, this.limit, this.allData)
  }

  filterByName(event): void {
    this.page = 0;
    this.currentData = this.allData.map(c => {
    let element = c.name.indexOf(event.target.value)
    if (element === -1) {
      return null 
    } else {
      return c
    }
  })
    this.currentData = this.currentData.filter(Boolean)
    this.companiesLength = (this.currentData.length === 0 ? this.allData.length : this.currentData.length)
    this.pageLimit = Math.floor(this.companiesLength/this.limit);
    this.getCompaniesFromLocal(this.limit * this.page, this.limit, this.currentData);
    this.page == this.pageLimit || (this.companiesLength % this.limit == 0 && this.page == this.pageLimit-1) ?
      this.disabledIncrement = true : this.disabledIncrement = false  
    this.page == 0 ? this.disabledDecrement = true : this.disabledDecrement;
  
  }
  
}
