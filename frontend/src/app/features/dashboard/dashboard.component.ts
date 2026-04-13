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
  allTasks: any[] = [];
  loading = true;
  error = '';
  showAll = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.loadTodayTasks();
  }

  private toLocalDateStr(value: any): string {
    if (!value) return '';
    const d = new Date(value);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private getTodayStr(): string {
    return this.toLocalDateStr(new Date());
  }

  loadTodayTasks(): void {
    const todayStr = this.getTodayStr();

    this.taskService.getTasks().subscribe({
      next: (tasks: any[]) => {
        this.allTasks = tasks;
        this.todayTasks = tasks.filter(t => this.toLocalDateStr(t.date) === todayStr);
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

  getLocalDate(value: any): string {
    return this.toLocalDateStr(value);
  }

  get displayedTasks(): any[] {
    return this.showAll ? this.allTasks : this.todayTasks;
  }

  get completedCount(): number {
    return this.displayedTasks.filter(t => t.completed).length;
  }

  get progressPercent(): number {
    if (!this.displayedTasks.length) return 0;
    return Math.round((this.completedCount / this.displayedTasks.length) * 100);
  }

  getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
  }
}