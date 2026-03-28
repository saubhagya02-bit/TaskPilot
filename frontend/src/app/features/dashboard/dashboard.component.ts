import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  today = new Date();

  userName = '';
  userPhoto: string = 'avatar.png';

  tasks: any[] = [];
  newTask = '';
  editingIndex: number | null = null;
  editedTask = '';

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
  
  const user = localStorage.getItem('user');
  
  if (user) {
    try {
      const userObj = JSON.parse(user);
      this.userName = userObj.name || 'User'; 
      this.userPhoto = userObj.photo || 'avatar.png';
    } catch (e) {
      console.error("Could not parse user data from localStorage", e);
      this.userName = 'Guest';
    }
  } else {
    this.userName = 'Guest'; 
  }
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
      this.userPhoto = reader.result as string;

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.photo = this.userPhoto;
      localStorage.setItem('user', JSON.stringify(user));

      this.cd.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask, completed: false });
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

  goToTasks() {
    this.router.navigate(['/tasks']);
  }
}
