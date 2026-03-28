import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  today = new Date();

  constructor(private cd: ChangeDetectorRef) {} 
  
  userName = '';
  userPhoto: string = 'avatar.png';

  tasks: any[] = [];

  newTask = '';
  editingIndex: number | null = null;
  editedTask = '';

  
  ngOnInit() {
    this.userName = localStorage.getItem('userName') || 'User';
    this.userPhoto = localStorage.getItem('userPhoto') || 'avatar.png';
  }

 onPhotoSelected(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file');
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const result = reader.result as string;

    console.log('Image loaded:', result);

    this.userPhoto = result;

    localStorage.setItem('userPhoto', result);

  };

  reader.onerror = () => {
    console.error('File reading failed');
  };

  reader.readAsDataURL(file);
}


  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        title: this.newTask,
        completed: false,
      });
      this.newTask = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
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
}
