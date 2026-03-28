import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  newTask = '';
  taskDate = '';

  editingIndex: number | null = null;
  editedTask = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load tasks from backend
  loadTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      console.log(res);
      this.tasks = res;
    });
  }

  // Add a new task
  addTask() {
    if (this.newTask.trim()) {
      const task = {
        title: this.newTask,
        completed: false,
        date: this.taskDate,
      };

      this.taskService.addTask(task).subscribe(() => {
        this.newTask = '';
        this.taskDate = '';
        this.loadTasks();
      });
    }
  }

  // Delete task by ID
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  // Start editing a task
  startEdit(index: number) {
    this.editingIndex = index;
    this.editedTask = this.tasks[index].title;
  }

  // Save edited task
  saveEdit(index: number) {
    if (this.editedTask.trim()) {
      const task = { ...this.tasks[index], title: this.editedTask };
      this.taskService.updateTask(task.id, task).subscribe(() => {
        this.editingIndex = null;
        this.loadTasks();
      });
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  toggleTask(index: number) {
    const task = { ...this.tasks[index], completed: !this.tasks[index].completed };
    this.taskService.updateTask(task.id, task).subscribe(() => {
      this.loadTasks();
    });
  }
}
