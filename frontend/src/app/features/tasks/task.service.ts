import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found. Please log in.');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getTasks() {
    return this.http.get<any[]>(this.api, { headers: this.getAuthHeaders() });
  }

  addTask(task: any) {
    return this.http.post<any>(this.api, task, { headers: this.getAuthHeaders() });
  }

  updateTask(id: number, task: any) {
    return this.http.put<any>(`${this.api}/${id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number) {
    return this.http.delete<any>(`${this.api}/${id}`, { headers: this.getAuthHeaders() });
  }
}