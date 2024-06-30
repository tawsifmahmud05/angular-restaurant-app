import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { TablesComponent } from './dashboard/tables/tables.component';
import { FoodsComponent } from './dashboard/foods/foods.component';
import { OrderComponent } from './dashboard/order/order.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';

import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { EmployeeTableComponent } from './dashboard/employees/employee-table/employee-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    AdminComponent,
    EmployeesComponent,
    TablesComponent,
    FoodsComponent,
    OrderComponent,
    OrdersComponent,
    BarChartComponent,
    EmployeeTableComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BaseChartDirective,

    BrowserAnimationsModule,

    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
