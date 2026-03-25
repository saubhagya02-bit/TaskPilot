import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  register() {
    this.http
      .post('http://localhost:5000/api/auth/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          this.toastr.success('Registered successfully 🎉');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err?.error?.message || 'Registration failed ❌');
        },
      });
  }
}
