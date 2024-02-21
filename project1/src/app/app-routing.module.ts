import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'agregar-empresa',
    loadChildren: () => import('./agregar-empresa/agregar-empresa.module').then( m => m.AgregarEmpresaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-empresas',
    loadChildren: () => import('./listar-empresas/listar-empresas.module').then( m => m.ListarEmpresasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listado-producto-empresa/:rutEmpresa',
    loadChildren: () => import('./listado-producto-empresa/listado-producto-empresa.module').then(m => m.ListadoProductoEmpresaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'perfil-usuario/:correo',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ver-producto/:idProducto',
    loadChildren: () => import('./ver-producto/ver-producto.module').then( m => m.VerProductoPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modificar-empresa/:rut_empresa',
    loadChildren: () => import('./modificar-empresa/modificar-empresa.module').then( m => m.ModificarEmpresaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modificar-producto/:id_producto',
    loadChildren: () => import('./modificar-producto/modificar-producto.module').then( m => m.ModificarProductoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mapa-empresa/:id_empresa',
    loadChildren: () => import('./mapa-empresa/mapa-empresa.module').then( m => m.MapaEmpresaPageModule)
  },
  {
    path: 'agregar-valoracion/:id_producto',
    loadChildren: () => import('./agregar-valoracion/agregar-valoracion.module').then( m => m.AgregarValoracionPageModule)
  },
  {
    path: 'lista-reportes',
    loadChildren: () => import('./lista-reportes/lista-reportes.module').then( m => m.ListaReportesPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'crear-publicidad',
    loadChildren: () => import('./crear-publicidad/crear-publicidad.module').then( m => m.CrearPublicidadPageModule)
  },









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
