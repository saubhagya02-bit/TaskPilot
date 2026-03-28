import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { TaskService } from '../task.service'; 

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  //styleUrls: ['./tasks.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  newTask = '';

  editingIndex: number | null = null;
  editedTask = '';

  constructor() {}

  ngOnInit(): void {
    
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        title: this.newTask,
        completed: false
      });
      this.newTask = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  startEdit(index: number) {
    this.editingIndex = index;
    this.editedTask = this.tasks[index].title;
  }

  saveEdit(index: number) {
    if (this.editedTask.trim()) {
      this.tasks[index].title = this.editedTask;
      this.editingIndex = null;
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }
}