
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class NavbarComponent implements OnInit {
  userName: string = 'João Silva';
  notificationCount: number = 3;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aqui você pode carregar dados do usuário de um serviço
    this.loadUserData();
  }

  /**
   * Carrega dados do usuário logado
   */
  loadUserData(): void {
    // Exemplo de como você pode carregar dados do usuário
    // this.userService.getCurrentUser().subscribe(user => {
    //   this.userName = user.name;
    //   this.notificationCount = user.unreadNotifications;
    // });
  }

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    // Aqui você pode implementar a lógica de logout
    // Por exemplo: limpar localStorage, chamar API de logout, etc.

    // Exemplo simples:
    // this.authService.logout();
    // localStorage.removeItem('token');

    // Redireciona para login
    this.router.navigate(['/login']);
  }

  /**
   * Abre modal/página de notificações
   */
  openNotifications(): void {
    // Implementar lógica para abrir notificações
    console.log('Abrindo notificações...');
    // Exemplo: this.router.navigate(['/notifications']);
  }

  /**
   * Navega para perfil do usuário
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

}
