import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  status: 'todo' | 'in-progress' | 'completed';
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('ordo_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getTasksByDate(date: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${date}`, {
      headers: this.getAuthHeaders()
    });
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    const body = {
      title: task.titulo,
      description: task.descricao,
      status: task.status,
      due_date: task.data
    };

    return this.http.post<Task>(this.apiUrl, body, {
      headers: this.getAuthHeaders()
    });
  }

  updateTaskStatus(taskId: string, newStatus: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${taskId}`, { status: newStatus }, { headers });
  }


  updateTask(taskId: string, updatedTask: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, updatedTask, {
      headers: this.getAuthHeaders()
    });
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
