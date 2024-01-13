import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.page.html',
  styleUrls: ['./listar-empresas.page.scss'],
})
export class ListarEmpresasPage implements OnInit {
  empresas: any[] = []; // Aquí almacenaremos las empresas del usuario
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const usuarioCorreo = localStorage.getItem('usuarioCorreo');

    // Comprobar si el correo es nulo antes de llamar a la función
    if (usuarioCorreo !== null) {
      this.authService.obtenerEmpresasPorUsuario(usuarioCorreo)
        .then((empresas: any[]) => {
          this.empresas = empresas;
        })
        .catch((error: any) => {
          console.error('Error al obtener empresas:', error);
        });
    } else {
      // Manejar el caso en que el correo sea nulo, por ejemplo, redirigiendo al usuario o mostrando un mensaje de error.
      console.error('El correo del usuario es nulo.');
    }
  }

}







