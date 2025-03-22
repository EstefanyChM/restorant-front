import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl:'./profile.component.scss'
})
export class ProfileComponent implements OnInit{
  items: MenuItem[] | undefined; // Declaración de la propiedad items

  constructor() {}

  ngOnInit() {
    this.items = [
      { label: 'Mis Datos', icon: 'fa-solid fa-user-gear', routerLink: './' },
      { label: 'Mis Pedidos', icon: 'fa-solid fa-drumstick-bite', routerLink: 'pedidos' },
      //{ label: 'Mis Favoritos', icon: 'fa-solid fa-star', routerLink: 'favoritos' },
      { label: 'Mis Direcciones', icon: 'fa-solid fa-location-pin', routerLink: 'direcciones' },
    ];
  }
}
