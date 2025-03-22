import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/private/menu/service/producto.service';
import { productoResponse } from 'src/app/private/menu/models/producto-response.model';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';


import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';  // Asegúrate de importar DataView de PrimeNG

import { PromocionService } from 'src/app/private/promocion/service/promocion.service';
import { PromocionResponse } from 'src/app/private/promocion/models/promocion-response.model';
import { PromocionRequest } from 'src/app/private/promocion/models/promocion-request.model';



@Component({
  selector: 'app-promotion-discount-list',
  templateUrl: './promotion-discount-list.component.html',
  styleUrl: './promotion-discount-list.component.scss'
})
export class PromotionDiscountListComponent implements OnInit {
  form: FormGroup;


  totalItems: number = 0;

  titleModal: string = "";
  modalRef?: BsModalRef;

  modalContent: string = '';

  /************************* */

  accionModal: number = 0;
  request: GenericFilterRequest = new GenericFilterRequest();


  rangeValues: number[] = [0, 100]; // Valores iniciales

  activeIndex: number = 0;
  filteredProductos: productoResponse[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private _productoService: ProductoService,
    private router: Router,
    private messageService: MessageService,
    private _promocionesService: PromocionService
  ) {
    this.form = this.fb.group({
      productos: this.fb.array([]) // Se asegura que sea un FormArray
    });
  }



  ngOnInit(): void {
    this.traerPromociones();
    console.log(this.promocionesBack);

  }




  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }



  filtrar() {

    /*this.request.filtros = [];

    // Asegurarse de que categoriaId no es null y convertirlo a string
    if (this.categoriaId !== null) {
      this.request.filtros.push({ name: "precioMin", value: '0' });
      this.request.filtros.push({ name: "precioMax", value: '100' });
      this.request.filtros.push({ name: "estado", value: 'true' });

      this.request.filtros.push({ name: "idCategoria", value: this.categoriaId.toString() });
    } else {
      // Manejo en caso de que sea null (si es necesario)
      console.warn("categoriaId es null, no se añadirá al filtro.");
    }
    console.log('filtros', this.request.filtros.map(filtro => filtro.value));
    this.request.cantidad = 1000;

    this._productoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<productoResponse>) => {
        // Asigna los productos recibidos y el total de registros
        this.productos = data.lista.map(producto => {
          producto.stockAuxiliar = producto.stock; // Simula el valor de stock
          return producto; // Devuelve el producto modificado
        });

        this.totalItems = data.totalRegistros;

        console.log("toma tus: ", this.productos);
      },

      error: () => {
        console.log("Error al filtrar categorías");
      },
      complete: () => {
        console.log("Filtrado completado");
        this.filterByPriceRange()
      },
    });*/
  }


promocionesBack : PromocionResponse[] = [];
  traerPromociones() :void {

    this._promocionesService.getAll().subscribe({
      next: (data)=>{this.promocionesBack = data

        console.log('traje',this.promocionesBack);

      },
      complete: ()=>{},
      error: ()=>{},
    })

  }




  ordenarproducto(template: TemplateRef<any>, promocion: PromocionResponse) {
    this.promocionSeleccionada = promocion;
    this.titleModal = 'ORDENAR producto';
    this.openModal(template);

    // No navegar a la subruta aquí
  }

promocionSeleccionada : PromocionResponse =  new PromocionResponse;

  ordenarpromocion(template: TemplateRef<any>, promocion:PromocionResponse) {
    this.promocionSeleccionada = promocion;
    this.titleModal = 'ORDENAR PROMOCIÓN';
    console.log(' es la promo', this.promocionSeleccionada);

    this.openModal(template);

    // No navegar a la subruta aquí
  }

  openModal(template: TemplateRef<any>) {
    console.log("producto selecc ==>", this.promocionSeleccionada);

    const modalConfig = {
      class: 'modal-lg' // O usa 'modal-lg' o una clase personalizada
    };

    this.modalRef = this.modalService.show(template, modalConfig);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    //if (res) {
    //  this.filtrar();
    //}
  }
  /* **************************** */

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  sortOrder: number = 0;

  sortField: string = '';
  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  sortOptions: any[] = [
    { label: 'Precio de mayor a menor', value: '!precio' },
    { label: 'Precio de menor a mayor', value: 'precio' }
  ];
  minPrice: number = 0; // Precio mínimo (se actualizará en OnInit)
  maxPrice: number = 100; // Precio máximo (se actualizará en OnInit)


  //filterByPriceRange() {
  //  const [minRange, maxRange] = this.rangeValues;
//
  //  // Filtrar los productos según el rango seleccionado
  //  this.filteredProductos = this.productos.filter(product =>
  //    product.precio >= minRange && product.precio <= maxRange
  //  );
  //}


}
