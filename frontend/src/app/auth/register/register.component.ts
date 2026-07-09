import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  register() {
    if (!this.name.trim() || !this.email || !this.password) {
      this.toastr.error('Please fill in all fields');
      return;
    }
    if (this.password.length < 6) {
      this.toastr.error('Password must be at least 6 characters');
      return;
    }

    this.loading = true;

    this.auth
      .register({ name: this.name.trim(), email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.toastr.success('Registered successfully 🎉');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
          this.toastr.error(err?.error?.message || 'Registration failed ❌');
        },
      });
  }
}
