import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {TaskService} from '../../services/task.service';
import { Task } from '../../services/task.service';
import {NewTaskModalComponent} from '../../components/new-task-modal/new-task-modal.component';

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
    // Lê a data do queryParam ou usa a data atual
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
    const tasks = this.taskService.getTasksByDate(this.currentDate);

    this.tarefasAFazer = tasks.filter(task => task.status === 'todo');
    this.tarefasEmProgresso = tasks.filter(task => task.status === 'in_progress');
    this.tarefasConcluidas = tasks.filter(task => task.status === 'done');
  }

  moveTask(taskId: string, newStatus: 'todo' | 'in_progress' | 'done'): void {
    this.taskService.updateTaskStatus(taskId, newStatus);
    this.loadTasks(); // Recarrega as tarefas após a atualização
  }

  getNextStatus(currentStatus: string): 'todo' | 'in_progress' | 'done' {
    switch (currentStatus) {
      case 'todo':
        return 'in_progress';
      case 'in_progress':
        return 'done';
      case 'done':
        return 'todo';
      default:
        return 'todo';
    }
  }

  getNextStatusLabel(currentStatus: string): string {
    switch (currentStatus) {
      case 'todo':
        return 'Em Progresso';
      case 'in_progress':
        return 'Concluído';
      case 'done':
        return 'A Fazer';
      default:
        return 'A Fazer';
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.loadTasks(); // Recarrega as tarefas após fechar o modal
  }

  getFormattedDate(): string {
    const date = new Date(this.currentDate + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
