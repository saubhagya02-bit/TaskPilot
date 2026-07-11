import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  userName = '';
  userPhoto = 'avatar.png';

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.userPhoto = user.photo || 'avatar.png';
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (dataUrl.length > 500_000) {
        console.warn('Photo is large; consider compressing before uploading.');
      }
      this.userPhoto = dataUrl;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.photo = dataUrl;
      localStorage.setItem('user', JSON.stringify(user));
    };
    reader.readAsDataURL(file);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
