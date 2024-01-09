import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nuevoUsuario = {
    correo_electronico: '',
    nombre_completo: '',
    password: '',
    telefono: ''
  };
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async registrarUsuario() {
    console.log(this.nuevoUsuario);
    try {
      const data = await this.authService.registrarUsuario(this.nuevoUsuario);
      this.router.navigate(['/login']); 
      this.nuevoUsuario = {
        correo_electronico: '',
        nombre_completo: '',
        password: '',
        telefono: ''
      };
      
      
    } catch (error) {
      console.error('Error al registrar usuario', error);
    }
  }

}
