import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { LoaderService } from '../shared/loader.service';
import { NotificationService } from '../shared/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { Table } from '../tables/table.model';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit {

  tableData: Table[] = [];

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadTables(0, 10);
  }




  loadTables(page: number, perPage: number): void {
    this.dataStorageService.getTables(page, perPage).pipe(this.loaderService.attachLoader()).subscribe(response => {
      this.tableData = response.data;
    });
  }

}
