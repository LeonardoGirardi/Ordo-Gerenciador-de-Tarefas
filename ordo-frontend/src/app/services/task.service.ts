// ordo-frontend/src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  status: 'todo' | 'in_progress' | 'done';
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Map<string, Task[]> = new Map();
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {
    this.initializeSampleTasks();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('ordo_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private initializeSampleTasks(): void {
    const today = new Date().toISOString().split('T')[0];
    const sampleTasks: Task[] = [
      { id: '1', titulo: 'Estudar Angular', descricao: 'Assistir aulas 5 e 6 do curso', status: 'todo', data: today },
      { id: '2', titulo: 'Criar layout Kanban', descricao: 'Finalizar HTML e CSS do componente', status: 'todo', data: today },
      { id: '3', titulo: 'Documentar projeto', descricao: 'Adicionar seções no README', status: 'in_progress', data: today },
      { id: '4', titulo: 'Configurar Navbar', descricao: 'Navbar com perfil e sair', status: 'done', data: today },
      { id: '5', titulo: 'Implementar autenticação', descricao: 'Login e logout com JWT', status: 'in_progress', data: today }
    ];
    this.tasks.set(today, sampleTasks);
  }

  getTasksByDate(date: string): Task[] {
    return this.tasks.get(date) || [];
  }

  getTaskById(id: string): Task | undefined {
    for (const [date, tasks] of this.tasks.entries()) {
      const task = tasks.find(t => t.id === id);
      if (task) return task;
    }
    return undefined;
  }

  addTask(task: Omit<Task, 'id'>): Task {
    const newTask: Task = { ...task, id: this.generateId() };
    const existingTasks = this.tasks.get(task.data) || [];
    existingTasks.push(newTask);
    this.tasks.set(task.data, existingTasks);
    return newTask;
  }

  updateTaskStatus(taskId: string, newStatus: 'todo' | 'in_progress' | 'done'): boolean {
    for (const [date, tasks] of this.tasks.entries()) {
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].status = newStatus;
        this.tasks.set(date, tasks);
        return true;
      }
    }
    return false;
  }

  updateTask(taskId: string, updatedTask: Partial<Task>): boolean {
    for (const [date, tasks] of this.tasks.entries()) {
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        this.tasks.set(date, tasks);
        return true;
      }
    }
    return false;
  }

  deleteTask(taskId: string): boolean {
    for (const [date, tasks] of this.tasks.entries()) {
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        this.tasks.set(date, tasks);
        return true;
      }
    }
    return false;
  }

  getAllTasks(): Task[] {
    const allTasks: Task[] = [];
    for (const tasks of this.tasks.values()) {
      allTasks.push(...tasks);
    }
    return allTasks;
  }

  getTaskStatsByDate(date: string): { todo: number; in_progress: number; done: number; total: number } {
    const tasks = this.getTasksByDate(date);
    return {
      todo: tasks.filter(t => t.status === 'todo').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      done: tasks.filter(t => t.status === 'done').length,
      total: tasks.length
    };
  }

  moveTaskToDate(taskId: string, newDate: string): boolean {
    const task = this.getTaskById(taskId);
    if (!task) return false;
    this.deleteTask(taskId);
    const taskForNewDate = { ...task, data: newDate };
    delete (taskForNewDate as any).id;
    this.addTask(taskForNewDate);
    return true;
  }

  clearTasksByDate(date: string): void {
    this.tasks.delete(date);
  }

  clearAllTasks(): void {
    this.tasks.clear();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { headers: this.getAuthHeaders() });
  }
}
