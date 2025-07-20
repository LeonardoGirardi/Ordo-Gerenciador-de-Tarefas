
// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  notificationCount: number = 3;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userName = user?.name || 'Desconhecido';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openNotifications(): void {
    console.log('Abrindo notificações...');
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}

