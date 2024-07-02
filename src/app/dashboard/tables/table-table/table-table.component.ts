import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../table.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataStorageService } from '../../shared/data-storage.service';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-table',
  templateUrl: './table-table.component.html',
  styleUrl: './table-table.component.css'
})
export class TableTableComponent {

  // displayedColumns: string[] = ['image', 'name', 'price', 'discountType', 'discount', 'discountPrice', 'action'];
  displayedColumns: string[] = ['tableNumber', 'numberOfSeats', 'isOccupied', 'employees', 'action'];
  dataSource = new MatTableDataSource<Table>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.dataStorageService.getTables().pipe(this.loaderService.attachLoader()).subscribe(data => {

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

  openConfirmationDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked Proceed
        console.log('Proceed');
      } else {
        // User clicked Cancel or clicked outside the dialog
        console.log('Cancelled');
      }
    });
  }

  onDeleteTable(id: string) {
    this.dataStorageService.deleteTable(id).pipe(this.loaderService.attachLoader()).subscribe(
      response => {
        console.log('Table deleted', response);
        this.notificationService.showSuccess("Table deleted successfully");
        this.dataStorageService.getTables().subscribe(data => {

          this.dataSource = data.data;
          console.log(this.dataSource);
        });
      },
      error => {
        this.notificationService.showError("Try again");
        console.error('Error deleting table', error);
      }
    );

  }
}
