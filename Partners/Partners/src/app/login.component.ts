import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('jwt', response.token);
        this.router.navigate(['/personas']);
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }

  onSubmit(): void {
    // Usuarios ficticios para validación
    const validUsers = [
      { username: 'admin', password: '1234' },
      { username: 'user1', password: 'password' },
    ];

    const isValid = validUsers.some(
      (user) => user.username === this.username && user.password === this.password
    );

    if (isValid) {
      // Redirigir a la página principal (puedes ajustar esta ruta según el diseño)
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Credenciales inválidas. Intente de nuevo.';
    }
  }
}
