import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Dados do usuário (exemplo - normalmente viria de um serviço)
  userProfile = {
    name: 'João Silva',
    avatar: 'assets/images/default-avatar.png',
    initials: 'JS'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicialização do componente
  }

  /**
   * Navega para o perfil do usuário
   */
  onProfileClick(): void {
    console.log('Navegando para perfil do usuário');
    // this.router.navigate(['/profile']);
  }

  /**
   * Realiza logout do sistema
   */
  onLogout(): void {
    console.log('Realizando logout...');
    // Aqui você implementaria a lógica de logout
    // Exemplo: this.authService.logout();
    // this.router.navigate(['/login']);
  }

  /**
   * Obtém as iniciais do usuário para exibir no avatar
   */
  getUserInitials(): string {
    if (this.userProfile.name) {
      return this.userProfile.name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return 'OR';
  }
}

