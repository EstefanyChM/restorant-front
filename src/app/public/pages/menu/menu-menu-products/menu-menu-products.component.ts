import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/private/menu/service/producto.service';
import { productoResponse } from 'src/app/private/menu/models/producto-response.model';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';


import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/private/menu/service/categoria.service';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';  // Asegúrate de importar DataView de PrimeNG
import { CategoriaResponse } from 'src/app/private/menu/models/categoria-response.model';
import { PromocionService } from 'src/app/private/promocion/service/promocion.service';
import { PromocionResponse } from 'src/app/private/promocion/models/promocion-response.model';
import { PromocionRequest } from 'src/app/private/promocion/models/promocion-request.model';



@Component({
  selector: 'app-menu-menu-products',
  templateUrl: './menu-menu-products.component.html',
  styleUrls: ['./menu-menu-products.component.scss']
})
export class MenuMenuProductsComponent implements OnInit {
  form: FormGroup;

  productos: productoResponse[] = [];
  totalItems: number = 0;

  titleModal: string = "";
  productoSelected: productoResponse = new productoResponse();
  modalRef?: BsModalRef;

  modalContent: string = '';

  /************************* */

  accionModal: number = 0;
  request: GenericFilterRequest = new GenericFilterRequest();

  categoriaNombre: string | null = null;
  categoriaId: number | null = null;

  rangeValues: number[] = [0, 100]; // Valores iniciales
  categoriasBack: CategoriaResponse[] = [];
  activeIndex: number = 0;
  filteredProductos: productoResponse[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.form = this.fb.group({
      productos: this.fb.array([]) // Se asegura que sea un FormArray
    });
  }



  ngOnInit(): void {
    this._categoriaService.getAllWithParameters(true).subscribe({
      next: (data: CategoriaResponse[]) => {
        this.categoriasBack = data;
        console.log("total: ", this.categoriasBack.length);
      },
      error: () => { },
      complete: () => {
        // Buscar el índice donde el nombre coincide con this.categoriaNombre
        this.activeIndex = this.categoriasBack.findIndex(x => x.nombre === this.categoriaNombre);

        // Si no encuentra coincidencia, dejarlo en 0 o en otro valor por defecto
        if (this.activeIndex === -1) {
          this.activeIndex = 0;
        }
      }
    });

    this.obtenerProductosDelURL();
  }



  obtenerProductosDelURL() {
    // Obtener el valor del parámetro de la URL (nombre de la categoría)
    this.route.paramMap.subscribe(params => {
      this.categoriaNombre = params.get('categoriaNombre');
      console.log('nom seleccionado: ', this.categoriaNombre);


      // Verificar que el nombre de la categoría no sea nulo
      if (this.categoriaNombre) {
        // Realizar la búsqueda por el nombre para obtener el ID
        this._categoriaService.getCategoriaByName(this.categoriaNombre).subscribe(categoria => {
          this.categoriaId = categoria;
          this.filtrar();
        });
      } else {
        console.error("Nombre de la categoría no encontrado en la URL.");
        // Aquí puedes manejar el caso de que el nombre de la categoría sea nulo
      }
      this.filteredProductos = [...this.productos];

    });

  }


  onTabClick(tab: any) {
    const newUrl = `/menu/${tab.nombre}`; // Construir la nueva URL
    this.router.navigateByUrl(newUrl); // Navegar a la nueva URL
  }





  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }



  filtrar() {

    this.request.filtros = [];

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
    });
  }




  ordenarproducto(template: TemplateRef<any>, producto: productoResponse) {
    this.productoSelected = producto;
    this.titleModal = 'ORDENAR producto';
    this.openModal(template);

    // No navegar a la subruta aquí
  }

promocionSeleccionada : PromocionResponse =  new PromocionResponse;

  ordenarpromocion(template: TemplateRef<any>, promocion:PromocionResponse) {
    this.promocionSeleccionada = promocion;
    this.titleModal = 'ORDENAR PROMOCIÓN';
    //this.openModal(template);

    // No navegar a la subruta aquí
  }

  openModal(template: TemplateRef<any>) {
    console.log("producto selecc ==>", this.productoSelected);

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


  filterByPriceRange() {
    const [minRange, maxRange] = this.rangeValues;

    // Filtrar los productos según el rango seleccionado
    this.filteredProductos = this.productos.filter(product =>
      product.precio >= minRange && product.precio <= maxRange
    );
  }


}
