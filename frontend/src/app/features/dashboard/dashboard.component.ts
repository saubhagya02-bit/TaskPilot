import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  today = new Date();
  userName = '';
  todayTasks: any[] = [];
  loading = true;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.loadTodayTasks();
  }

  loadTodayTasks(): void {
    const todayStr = new Date().toISOString().split('T')[0];
    this.taskService.getTasks().subscribe({
      next: (tasks: any[]) => {
        this.todayTasks = tasks.filter(t => t.date === todayStr);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Could not load tasks.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  toggleTask(task: any): void {
    const updated = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id, updated).subscribe({
      next: () => { task.completed = !task.completed; },
      error: (err) => console.error('Toggle failed', err),
    });
  }

  get completedCount(): number {
    return this.todayTasks.filter(t => t.completed).length;
  }

  get progressPercent(): number {
    if (!this.todayTasks.length) return 0;
    return Math.round((this.completedCount / this.todayTasks.length) * 100);
  }

  getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
  }
}