// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employee-table',
//   templateUrl: './employee-table.component.html',
//   styleUrl: './employee-table.component.css'
// })
// export class EmployeeTableComponent {

// }
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from '../employee.model';
import { DataStorageService } from '../../shared/data-storage.service';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  // displayedColumns: string[] = ['id', 'image', 'designation', 'joinDate', 'amountSold', 'userName'];
  displayedColumns: string[] = ['image', 'name', 'email', 'designation', 'joinDate', 'phone', 'action'];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getEmployees().subscribe(data => {

      this.dataSource = data.data;
      console.log(this.dataSource);
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // https://restaurantapi.bssoln.com/images/user/20-02-2024-10-58-12-9531685.jpg
}
