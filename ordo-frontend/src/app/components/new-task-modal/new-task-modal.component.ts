import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent {
  @Input() isOpen = false;
  @Input() currentDate = '';
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() modalClosed = new EventEmitter<void>();

  titulo = '';
  descricao = '';
  isSubmitting = false;

  constructor(private taskService: TaskService) {}

  get isTituloValid(): boolean {
    return this.titulo.trim().length >= 3;
  }

  get isDescricaoValid(): boolean {
    return this.descricao.trim().length >= 5;
  }

  get isFormValid(): boolean {
    return this.isTituloValid && this.isDescricaoValid;
  }

  onSubmit(): void {
    if (!this.isFormValid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const newTask: Omit<Task, 'id'> = {
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      status: 'todo',
      data: this.currentDate || this.getCurrentDate()
    };

    this.taskService.createTask(newTask).subscribe({
      next: (createdTask) => {
        this.taskCreated.emit(createdTask);
        this.resetForm();
        this.isSubmitting = false;
      },
      error: () => {
        // Aqui você pode mostrar erro com snackbar/toast, se desejar
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.resetForm();
    this.modalClosed.emit();
  }

  private resetForm(): void {
    this.titulo = '';
    this.descricao = '';
    this.isSubmitting = false;
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
