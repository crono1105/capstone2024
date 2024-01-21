import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./agregar-empresa/agregar-empresa.module').then( m => m.AgregarEmpresaPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'listar-empresas',
    loadChildren: () => import('./listar-empresas/listar-empresas.module').then( m => m.ListarEmpresasPageModule)
  },
  {
    path: 'listado-producto-empresa/:rutEmpresa',
    loadChildren: () => import('./listado-producto-empresa/listado-producto-empresa.module').then(m => m.ListadoProductoEmpresaPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },

  {
    path: 'perfil-usuario/:correo',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'ver-producto/:idProducto',
    loadChildren: () => import('./ver-producto/ver-producto.module').then( m => m.VerProductoPageModule)
  },  {
    path: 'modificar-perfil',
    loadChildren: () => import('./modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
