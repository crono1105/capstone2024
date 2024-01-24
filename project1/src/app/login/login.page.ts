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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async login() {
    try {
      // Intenta iniciar sesión como usuario
      const resultUsuario = await this.authService.loginUsuario(this.credenciales);
      console.log('Login de usuario exitoso', resultUsuario);
      this.router.navigate(['/home']);
    } catch (errorUsuario) {
      // Si el inicio de sesión como usuario falla, intenta como administrador
      try {
        const resultAdmin = await this.authService.loginAdmin(this.credenciales);
        console.log('Login de administrador exitoso', resultAdmin);
        // Puedes realizar acciones específicas para el administrador aquí
        this.router.navigate(['home']);
      } catch (errorAdmin) {
        console.error('Error al iniciar sesión', errorAdmin);
      }
    }
  }
}