import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Company } from '../company.model';
// import { Income } from '../income.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  companiesList: Company[];
  company: Company;
  page: number = 0;
  limit: number = 10;
  pageLimit: number;
  disabledIncrement: boolean = false;
  disabledDecrement: boolean = true;
  companiesLength: number;
  // incomesList: Income[];
  constructor( 
    private companiesService: CompaniesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void { 
    this.getCompanies(this.page * this.limit, this.limit);

  }

  // changeLimit(event): void {
  //   const newValue = event.target.value;
  //   this.limit = newValue;
  //   this.page = 0;
  //   this.getCompanies(0, newValue);
  //   console.log(newValue)
  // }  

  
  getCompanies(skip: number, limit: number): void {
    this.companiesService.getCompanies()
      .subscribe(companies => {
        this.companiesList = companies.slice(skip, skip + limit);
        this.companiesLength = companies.length;
        this.pageLimit = Math.floor(this.companiesLength/limit);
      });
  };

  incrementPage() {
    this.page++;
    this.disabledDecrement=false;
    if (this.page == this.pageLimit || (this.companiesLength % this.limit == 0 && this.page == this.pageLimit-1)) {
      this.disabledIncrement = true;
    } else this.disabledIncrement = false;
    // console.log('page ' + this.page);
    // console.log('pageLimit ' + this.pageLimit);
    // console.log('limit ' + this.limit);
    this.getCompanies(this.limit * this.page, this.limit);
  }

  decrementPage() {
    this.page--;
    this.disabledIncrement = false;
    if (this.page == 0) {
      this.disabledDecrement = true;
    } else this.disabledDecrement = false;
    // console.log(this.disabledDecrement+'dec')
    // console.log('page ' + this.page);
    // console.log('pageLimit ' + this.pageLimit);
    // console.log('limit ' + this.limit);
    this.getCompanies(this.limit * this.page, this.limit);
  }


}
