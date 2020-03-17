# Companies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Start the project

Four quick steps to start the project:
1. Run `git clone https://github.com/magdap265/crochet-project-frontend.git`.
2. Run `npm install`.
3. Run `ng serve -o`.

## Description
This project consists of three components: header, table and company-details. Header component contains only navbar with title. The second component is the bigest one. It presents the table of companies with companies ids, names, localization and incomes. User can filter the table by names and sort by imcome (ascending and descending). The table also has pagination and there display 10 companies per page. Clicking the selected company, we go to the last component - company-details. This component contains small table with details of selected company. There are id, city, total income, average income, last month income. Additional Users should have an option to describe the range (start and end date) of calculated data (total and average income).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
