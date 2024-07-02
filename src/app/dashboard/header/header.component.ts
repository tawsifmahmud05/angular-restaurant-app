import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: Admin | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    console.log(this.currentUser);

  }

  logout() {
    // Clear localStorage or any stored user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    this.router.navigate(['']);
  }

}
