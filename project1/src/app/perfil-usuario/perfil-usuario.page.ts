import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  correo: string = ''; // Inicializamos la propiedad correo con un valor vacío
  usuario: any; // Esta variable almacenará los datos del usuario

  constructor(private route: ActivatedRoute, private authService: AuthService,private router: Router) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.correo = params['correo'];
      
      
      this.obtenerUsuario();
    });
  }

  async obtenerUsuario() {
    try {
      this.usuario = await this.authService.getUsuarioPorCorreo(this.correo);
      console.log('Datos del usuario:', this.usuario);

    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  }


  GotoListarEmpresa(){
    this.router.navigate(['/listar-empresas']);  
  }

  GoToModificarPerfil(){
    this.router.navigate(['modificar-perfil']);
  }
}
