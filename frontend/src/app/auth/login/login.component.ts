import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService   
  ) {}

  login() {
    this.http.post('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);

        this.toastr.success('Login successful 🎉');

        this.router.navigate(['/tasks']);
      },

      error: (err) => {
        console.error(err);

        this.toastr.error(
          err?.error?.message || 'Login failed ❌'
        );
      }
    });
  }
}