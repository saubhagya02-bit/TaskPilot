import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  userName = '';
  userPhoto = 'avatar.png';
  activeRoute = 'dashboard';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.userPhoto = user.photo || 'avatar.png';

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url: string = e.urlAfterRedirects;
        this.activeRoute = url.includes('tasks') ? 'tasks' : 'dashboard';
      });
  }

  navigate(path: string): void {
    this.activeRoute = path;
    this.router.navigate([`/${path}`]);
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Warn if image is very large (> 500KB base64 ≈ 375KB raw)
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