
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink, HttpClientModule, ]
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  notificationCount: number = 3;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getCurrentUser().subscribe({
      next: user => {
        this.userName = user.name;
      },
      error: () => {
        this.userName = 'Desconhecido';
      }
    });
  }

  logout(): void {
    localStorage.removeItem('ordo_token');
    localStorage.removeItem('ordo_user');
    this.router.navigate(['/login']);
  }

  openNotifications(): void {
    console.log('Abrindo notificações...');
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
