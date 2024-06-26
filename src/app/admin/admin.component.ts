import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    // Clear localStorage or any stored user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    this.router.navigate(['']);
  }
}
