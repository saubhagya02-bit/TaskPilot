import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private API = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTasks() {
    return this.http.get(this.API, { headers: this.getAuthHeaders() });
  }

  addTask(task: any) {
    return this.http.post(this.API, task, { headers: this.getAuthHeaders() });
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${this.API}/${id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }
}