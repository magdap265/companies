import { Component, OnInit, Input } from '@angular/core';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  // @Input companyDetails;
  constructor(private companiesService: CompaniesService) { }

  ngOnInit(): void {
  }


}
