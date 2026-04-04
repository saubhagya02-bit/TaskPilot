import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  userName = '';
  userPhoto = 'avatar.png';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.userPhoto = user.photo || 'avatar.png';
  }

  navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.userPhoto = reader.result as string;

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.photo = this.userPhoto;
      localStorage.setItem('user', JSON.stringify(user));
    };

    reader.readAsDataURL(file);
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }
}