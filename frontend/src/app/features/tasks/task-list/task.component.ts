import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  newTask = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }

  addTask() {
    this.taskService.addTask({ title: this.newTask }).subscribe(() => {
      this.newTask = '';
      this.loadTasks();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}