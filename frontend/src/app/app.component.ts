import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/tasks']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}