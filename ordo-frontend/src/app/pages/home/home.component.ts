import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentDate: string = '';
  userName: string = '';
  tarefas: Task[] = [];
  pendentes: number = 0;
  emAndamento: number = 0;
  concluidas: number = 0;
  progresso: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.currentDate = params['date'] || this.getCurrentDate();

    this.authService.getCurrentUser().subscribe(user => {
      if (user) this.userName = user.name;
    });

    this.taskService.getTasksByDate(this.currentDate).subscribe(tasks => {
      this.tarefas = tasks;
      this.pendentes = tasks.filter(t => t.status === 'todo').length;
      this.emAndamento = tasks.filter(t => t.status === 'in-progress').length;
      this.concluidas = tasks.filter(t => t.status === 'completed').length;
      const total = this.tarefas.length;
      this.progresso = total > 0 ? Math.round((this.concluidas / total) * 100) : 0;
    });
  }

  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getFormattedDate(): string {
    return new Date(this.currentDate + 'T00:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Sao_Paulo'
    });
  }

  irParaKanban() {
    this.router.navigate(['/kanban'], { queryParams: { date: this.currentDate } });
  }

  criarTarefa() {
    this.irParaKanban(); // ou abrir modal
  }

  verRelatorio() {
    alert('Funcionalidade de relatório ainda não implementada');
  }
}
