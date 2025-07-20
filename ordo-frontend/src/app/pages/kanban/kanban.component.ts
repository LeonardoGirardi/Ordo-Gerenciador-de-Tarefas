import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { NewTaskModalComponent } from '../../components/new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  standalone: true,
  imports: [CommonModule, NewTaskModalComponent]
})
export class KanbanComponent implements OnInit {
  currentDate: string = '';
  tarefasAFazer: Task[] = [];
  tarefasEmProgresso: Task[] = [];
  tarefasConcluidas: Task[] = [];
  isModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentDate = params['date'] || this.getCurrentDate();
      this.loadTasks();
    });
  }

  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private loadTasks(): void {
    this.taskService.getTasksByDate(this.currentDate).subscribe(tasks => {
      this.tarefasAFazer = tasks.filter(task => task.status === 'todo');
      this.tarefasEmProgresso = tasks.filter(task => task.status === 'in-progress');
      this.tarefasConcluidas = tasks.filter(task => task.status === 'completed');
    });
  }

  moveTask(id: string, newStatus: string) {
    this.taskService.updateTaskStatus(id, newStatus).subscribe({
      next: () => this.loadTasks(),
      error: err => console.error(err)
    });
  }

  getNextStatus(currentStatus: string): 'todo' | 'in-progress' | 'completed' {
    switch (currentStatus) {
      case 'todo': return 'in-progress';
      case 'in-progress': return 'completed';
      case 'completed': return 'todo';
      default: return 'todo';
    }
  }

  getNextStatusLabel(currentStatus: string): string {
    switch (currentStatus) {
      case 'todo': return 'Em Progresso';
      case 'in-progress': return 'Concluído';
      case 'completed': return 'A Fazer';
      default: return 'A Fazer';
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.loadTasks();
  }

  getFormattedDate(): string {
    const date = new Date(this.currentDate + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Sao_Paulo'
    });
  }
  deleteTask(id: number | undefined) {
    if (!id) return;
    this.taskService.deleteTask(id.toString()).subscribe({
      next: () => {
        this.tarefasAFazer = this.tarefasAFazer.filter(t => t.id !== id);
        this.tarefasEmProgresso = this.tarefasEmProgresso.filter(t => t.id !== id);
        this.tarefasConcluidas = this.tarefasConcluidas.filter(t => t.id !== id);
      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    });
  }




}

