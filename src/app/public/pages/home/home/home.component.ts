import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/private/menu/service/categoria.service';
import { CategoriaResponse } from 'src/app/private/menu/models/categoria-response.model';
import { ProductoService } from 'src/app/private/menu/service/producto.service';
import { productoResponse } from 'src/app/private/menu/models/producto-response.model';

import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeHomePageComponent implements OnInit {
  categoriasBack: CategoriaResponse[] = [];
  pp: productoResponse[] = [];
  isLoading: boolean = true; // Variable para controlar la visibilidad del spinner

  constructor(
    private _categoriaService: CategoriaService,
    private router: Router,
    private p: ProductoService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
this._categoriaService.getAllWithParameters(true).subscribe({
      next: (data: CategoriaResponse[]) => {
        this.categoriasBack = data;
      },
      error: () => {
        // Manejar errores si es necesario
      },
      complete: () => {
        this.isLoading = false; // Ocultar el spinner cuando se completa la carga
      }
    });

    this.websocketService.listen('registroEliminado').subscribe((id) => {
      const categoriaId = id as number;
      this.categoriasBack = this.categoriasBack.filter(categoria => categoria.id !== categoriaId);
    });

    this.websocketService.listen('restaurarRegistro').subscribe((jsonCat) => {
      this.categoriasBack.unshift(jsonCat as any);
    });
  }

  onImageClick(nombre: string): void {
    this.router.navigate(['menu/productos', nombre]);
  }
}
