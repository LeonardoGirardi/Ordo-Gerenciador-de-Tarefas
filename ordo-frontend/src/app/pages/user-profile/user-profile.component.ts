import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  email: string = '';

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        console.warn('Usuário não autenticado');
        return;
      }

      this.email = user.email;
      this.profileForm = this.fb.group({
        name: [user.name]
      });

      this.passwordForm = this.fb.group({
        currentPassword: [''],
        newPassword: ['']
      });
    });
  }

  updateName() {
    this.authService.updateName(this.profileForm.value.name).subscribe({
      next: () => alert('Nome atualizado com sucesso'),
      error: () => alert('Erro ao atualizar nome')
    });
  }

  updatePassword() {
    const { currentPassword, newPassword } = this.passwordForm.value;
    this.authService.updatePassword(currentPassword, newPassword).subscribe({
      next: () => alert('Senha atualizada com sucesso'),
      error: err => alert(err.error?.error || 'Erro ao atualizar senha')
    });
  }
}

