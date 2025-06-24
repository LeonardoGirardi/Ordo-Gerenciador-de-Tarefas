import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink
  ]
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Exemplo simples: redireciona para login
    this.router.navigate(['/login']);
  }
}
