import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../table.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-tabel-table',
  templateUrl: './tabel-table.component.html',
  styleUrl: './tabel-table.component.css'
})
export class TabelTableComponent {

  // displayedColumns: string[] = ['image', 'name', 'price', 'discountType', 'discount', 'discountPrice', 'action'];
  displayedColumns: string[] = ['tableNumber', 'numberOfSeats', 'isOccupied', 'employees', 'action'];
  dataSource = new MatTableDataSource<Table>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getTables().subscribe(data => {

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
}
