import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataStorageService } from '../../shared/data-storage.service';
import { Food } from '../food.model';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrl: './food-table.component.css'
})
export class FoodTableComponent implements OnInit, AfterViewInit {

  // displayedColumns: string[] = ['image', 'name', 'price', 'discountType', 'discount', 'discountPrice', 'action'];
  displayedColumns: string[] = ['image', 'name', 'price', 'discountType', 'discount', 'discountPrice', 'action'];
  dataSource = new MatTableDataSource<Food>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getFoods().subscribe(data => {

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