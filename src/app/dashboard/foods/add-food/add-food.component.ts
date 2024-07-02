import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})
export class AddFoodComponent {

  food = {
    name: "Pudding",
    description: "lorem Ipsum",
    price: 300,
    discountType: 0,
    discount: 0,
    discountPrice: 300,
    image: "path/to/image.jpg",
    base64: "aGVsbG8gd29ybGQ="
  };

  constructor(private dataStorageService: DataStorageService,
    private router: Router, private loaderService: LoaderService,
    private notificationService: NotificationService) {

  }
  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(this.food);

    if (form.valid) {
      this.dataStorageService.addFood(this.food).pipe(this.loaderService.attachLoader()).subscribe(
        response => {
          console.log('Food added successfully', response);
          this.notificationService.showSuccess("Food Added successfully")

          this.router.navigate(['dashboard/foods']);
        },
        error => {
          this.loaderService.hideLoader();
          console.error('Error adding food', error);
          this.notificationService.showError("Please try again!")

        }
      );
    }
  }
}
