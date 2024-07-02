import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css'
})
export class AddTableComponent {


  table = {
    tableNumber: "TB002",
    numberOfSeats: 3,
    image: "path/to/image.jpg",
    base64: "aGVsbG8gd29ybGQ="
  };

  constructor(private dataStorageService: DataStorageService,
    private router: Router, private loaderService: LoaderService,
    private notificationService: NotificationService,
  ) {

  }
  ngOnInit(): void {

  }



  onSubmit(form: NgForm) {
    console.log(this.table);

    if (form.valid) {
      this.dataStorageService.addTable(this.table).pipe(this.loaderService.attachLoader()).subscribe(
        response => {
          console.log('Table added successfully', response);
          this.notificationService.showSuccess("Table Created successfully")

          this.router.navigate(['dashboard/tables']);
        },
        error => {
          this.loaderService.hideLoader();
          console.error('Error adding table', error);
          this.notificationService.showError("Please try again!")

        }
      );
    }
  }
}
