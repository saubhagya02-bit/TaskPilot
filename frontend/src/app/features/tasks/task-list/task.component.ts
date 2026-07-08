import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask = '';
  // Defaults to today so a task the user adds without touching the date
  // picker still shows up in the dashboard's "Today" view.
  taskDate = todayStr();
  editingIndex: number | null = null;
  editedTask = '';
  editedDate = '';
  loading = true;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load tasks.';
        this.loading = false;
      },
    });
  }

  addTask(): void {
    if (!this.newTask.trim()) return;
    const task = { title: this.newTask.trim(), completed: false, date: this.taskDate };
    this.taskService.addTask(task).subscribe({
      next: () => {
        this.newTask = '';
        this.taskDate = todayStr();
        this.loadTasks();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to add task.';
      },
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.loadTasks(),
      error: (err) => {
        this.error = err?.error?.message || 'Failed to delete task.';
      },
    });
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.editedTask = this.tasks[index].title;
    this.editedDate = this.tasks[index].date || '';
  }

  saveEdit(task: Task): void {
    if (!this.editedTask.trim()) return;
    const updated = { ...task, title: this.editedTask.trim(), date: this.editedDate };
    this.taskService.updateTask(task.id, updated).subscribe({
      next: () => {
        this.editingIndex = null;
        this.loadTasks();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to update task.';
      },
    });
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  toggleTask(task: Task): void {
    const updated = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id, updated).subscribe({
      next: () => {
        task.completed = !task.completed;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to update task.';
      },
    });
  }
}
