import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  API = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.API);
  }

  addTask(task: any) {
    return this.http.post(this.API, task);
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${this.API}/${id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
