import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  constructor(private dataStoragerService: DataStorageService) {

  }

  ngOnInit(): void {
    this.dataStoragerService.getEmployees().subscribe(data => {
      console.log(data);
    });
  }
}
