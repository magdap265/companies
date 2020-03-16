import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './table/pagination/pagination.component';
import { SortComponent } from './table/sort/sort.component';
import { SearchComponent } from './table/search/search.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    PaginationComponent,
    SortComponent,
    SearchComponent,
    CompanyDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: TableComponent },
      { path: 'company/:companyId', component: CompanyDetailComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
