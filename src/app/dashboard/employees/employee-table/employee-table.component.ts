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
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'name', 'email', 'designation', 'joinDate', 'phone', 'action'];
  // displayedColumns: string[] = ['image', 'name',];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataStorageService.getEmployees().subscribe(data => {

      this.dataSource = data.data;
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

  onDelete(id: string) {
    this.dataStorageService.deleteEmployee(id).pipe(this.loaderService.attachLoader()).subscribe(
      response => {
        this.notificationService.showSuccess("Employee deleted successfully");
        this.dataStorageService.getEmployees().subscribe(data => {

          this.dataSource = data.data;
        });
      },
      error => {
        this.notificationService.showError("Try again");
      }
    );

  }


  // https://restaurantapi.bssoln.com/images/user/20-02-2024-10-58-12-9531685.jpg
}
