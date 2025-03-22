import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent {
  rutasSinHeader = ['/perfil', '/perfil/pedidos', '/perfil/favoritos', '/perfil/direcciones' ]; // Agrega aquí las rutas donde NO quieres mostrar el header

  constructor(private router: Router) {}

  mostrarHeader(): boolean {
    return !this.rutasSinHeader.includes(this.router.url);
  }
}
