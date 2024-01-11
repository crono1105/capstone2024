import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';    

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn)
  }

  goToLogin() {
    this.router.navigate(['/login']);  
  }

  logout() {
    this.authService.logout();
  }

  // Cambié el nombre de la función a isUserLoggedIn para evitar conflictos
  isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

  goToAddEmpresa() {
    this.router.navigate(['/agregar-empresa']);  
  }
}
