import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {


  employee = {
    designation: "Junior",
    joinDate: "2024-07-01T12:05:24.948Z",
    email: "john.de@example.com",
    phoneNumber: "91239367890",
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    fatherName: "Michael Doe",
    motherName: "Mary Doe",
    spouseName: "Jane Doe",
    dob: "1990-01-01T00:00:00Z",
    nid: "1234569018",
    genderId: 1,
    image: "path/to/image.jpg",
    base64: "aGVsbG8gd29ybGQ="
  };

  employeeData = {
    designation: "Software Engineer",
    joinDate: "2024-07-01T12:05:24.948Z",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    fatherName: "Michael Doe",
    motherName: "Mary Doe",
    spouseName: "Jane Doe",
    dob: "1990-01-01T00:00:00Z",
    nid: "1234567890123",
    genderId: 1, // Assuming 0 for Male, 1 for Female, 2 for Other, etc.
    image: "path/to/image.jpg",
    base64: "base64encodedstring"
  };

  constructor(private dataStorageService: DataStorageService,
    private router: Router, private loaderService: LoaderService,
    private notificationService: NotificationService) {

  }
  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(this.employee);

    if (form.valid) {
      this.dataStorageService.addEmployee(this.employee).pipe(this.loaderService.attachLoader()).subscribe(
        response => {
          console.log('Employee added successfully', response);
          this.notificationService.showSuccess("Employee Added successfully")

          this.router.navigate(['dashboard/employees']);
        },
        error => {
          this.loaderService.hideLoader();
          console.error('Error adding employee', error);
          this.notificationService.showError("Please try again!")

        }
      );
    }
  }

}