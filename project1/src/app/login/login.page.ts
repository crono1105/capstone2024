import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales = {
    correo_electronico: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {}

  async loginUsuario() {
    try {
      const result = await this.authService.loginUsuario(this.credenciales);
      console.log('Login exitoso', result);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al iniciar sesión', error); // Muestra el objeto de error completo en la consola
    }
  }
}
