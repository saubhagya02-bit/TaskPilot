import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.toastr.error('Please enter your email and password');
      return;
    }
    this.loading = true;

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);

        const user = {
          name: res.user?.name || 'User',
          photo: 'avatar.png',
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.toastr.success('Login successful 🎉');
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        this.loading = false;
        console.error(err);

        this.toastr.error(err?.error?.message || 'Login failed ❌');
      },
    });
  }
}
