import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Task {
  id?: number;
  titulo: string;
  descricao: string;
  status: 'todo' | 'in-progress' | 'completed';
  data: string;
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() moveTask = new EventEmitter<{ id: number | undefined, newStatus: string }>();

  getNextStatus(currentStatus: string): string {
    switch (currentStatus) {
      case 'todo':
        return 'in-progress';
      case 'in-progress':
        return 'completed';
      case 'completed':
        return 'todo';
      default:
        return 'todo';
    }
  }

  getNextStatusLabel(currentStatus: string): string {
    switch (currentStatus) {
      case 'todo':
        return 'Em Progresso';
      case 'in-progress':
        return 'Concluído';
      case 'completed':
        return 'A Fazer';
      default:
        return 'Em Progresso';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'todo':
        return 'bg-primary';
      case 'in-progress':
        return 'bg-warning';
      case 'completed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'todo':
        return 'A Fazer';
      case 'in-progress':
        return 'Em Progresso';
      case 'completed':
        return 'Concluído';
      default:
        return 'Indefinido';
    }
  }

  getButtonClass(status: string): string {
    switch (status) {
      case 'todo':
        return 'btn-outline-warning';
      case 'in-progress':
        return 'btn-outline-success';
      case 'completed':
        return 'btn-outline-primary';
      default:
        return 'btn-outline-secondary';
    }
  }

  getButtonIcon(status: string): string {
    switch (status) {
      case 'todo':
        return 'fas fa-arrow-right';
      case 'in-progress':
        return 'fas fa-arrow-right';
      case 'completed':
        return 'fas fa-redo';
      default:
        return 'fas fa-arrow-right';
    }
  }

  onMoveTask(): void {
    const newStatus = this.getNextStatus(this.task.status);
    this.moveTask.emit({ id: this.task.id, newStatus });
  }
}
