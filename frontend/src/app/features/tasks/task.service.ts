import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string | null;
}
@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.api);
  }

  addTask(task: Partial<Task>) {
    return this.http.post<any>(this.api, task);
  }

  updateTask(id: number, task: any) {
    return this.http.put<any>(`${this.api}/${id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
