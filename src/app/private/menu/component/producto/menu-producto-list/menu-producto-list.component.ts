import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../../service/producto.service';
import { productoResponse } from '../../../models/producto-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';
import { CategoriaService } from '../../../service/categoria.service';
import { CategoriaResponse } from '../../../models/categoria-response.model';
import { SelectItem } from 'primeng/api';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { eliminar_registro } from 'src/app/shared/functions/alerts';

@Component({
  selector: 'app-menu-producto-list',
  templateUrl: './menu-producto-list.component.html',
  styleUrls: ['./menu-producto-list.component.scss']
})

export class MenuproductoListComponent implements OnInit {

  modalRef?: BsModalRef;
  productos: productoResponse[] = [];
  productoSelected: productoResponse = new productoResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup;
  totalItems: number = 0;
  itemsPerPage: number = 8;
  currentPage: number = 1; // Página actual

  request: GenericFilterRequest = new GenericFilterRequest();
  selectedList: SelectItem = { value: '' };



  estadoOptions: any[] = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
  ];

  disponibilidadOptions: any[] = [
    { label: 'Disponible', value: true },
    { label: 'No Disponible', value: false },
  ];

  categorias: { label: string; value: number }[] = []; // Estructura para p-dropdown

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private websocketService: WebsocketService
  ) {
    // Formulario para el filtro de productos
    this.myFormFilter = this.fb.group({
      nombre: ["", []],
      categoria: ["", []],
      disponibilidad: ["", []],
      estado: ["", []],
      rangoPrecio: this.fb.control(this.rangeValues)
    });

  }
  rangeValues: number[] = [0, 0]; // Valores iniciales

  ngOnInit(): void {
    //this.myFormFilter.patchValue(this.productoSelected);
    console.log('hola');


    this.cargarCategorias();
    this.rangoPrecios();


    //console.log('escucxaaaaaaa A.1');
    //console.log(`pMin: ${this.rangeValues[0]}`);
    //console.log(`pMax: ${this.rangeValues[1]}`);
    //console.log('escucxaaaaaaa A.2');

    // Suscribirse a los cambios en el formularioW
    this.myFormFilter.valueChanges.subscribe(() => {
      this.filtrar();
    });

    // Escuchar evento desde el servidor para eliminar el registro en la vista
    this.websocketService.listen('registroEliminado').subscribe((id) => {
      const productoId = id as number;
      this.productos = this.productos.filter(producto => producto.id !== productoId);
    });

    this.websocketService.listen('restaurarRegistro').subscribe((jsonCat) => {
      //alert('restaurar' + (jsonCat as any).nombre);
      this.productos.unshift(jsonCat as any);
    });
  }

  rangoPrecios() {
    this._productoService.rangoPrecios().subscribe({
      next: (data) => {
        this.rangeValues[0] = data.minPrecio;
        this.rangeValues[1] = data.maxPrecio;
        console.log('mi objeto anonimo es: ', data);
        console.log('escucxaaaaaaa B.1');
        console.log(`pMin: ${this.rangeValues[0]}`);
        console.log(`pMax: ${this.rangeValues[1]}`);
        console.log('escucxaaaaaaa B.2');
        this.filtrar();
      },
      error: () => { },
      complete: () => { }
    })
  }





  filtrar() {
    //console.log('filtrar');
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros = [];

    this.request.filtros.push({ name: "precioMin", value: valueForm.rangoPrecio[0] !== null ? valueForm.rangoPrecio[0] : '' });
    this.request.filtros.push({ name: "precioMax", value: valueForm.rangoPrecio[1] !== null ? valueForm.rangoPrecio[1] : '' });
    this.request.filtros.push({ name: "estado", value: valueForm.estado !== null ? valueForm.estado : '' });

    this.request.filtros.push({ name: "idCategoria", value: valueForm.categoria !== null ? valueForm.categoria : '' });
    this.request.filtros.push({ name: "nombre", value: valueForm.nombre !== null ? valueForm.nombre : '' });
    this.request.filtros.push({ name: "disponibilidad", value: valueForm.disponibilidad !== null ? valueForm.disponibilidad : '' });

    //console.log(`precioMin: ${valueForm.rangoPrecio[0]}`);
    //console.log(`precioMax: ${valueForm.rangoPrecio[1]}`);
    //console.log(`idCategoria: ${valueForm.categoria}`);
    //console.log(`nombre: ${valueForm.nombre}`);
    //console.log(`disponibilidad: ${valueForm.disponibilidad}`);
    //console.log(`estado: ${valueForm.estado}`);



    this.request.numeroPagina = this.currentPage;
    this.request.cantidad = this.itemsPerPage;

    this._productoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<productoResponse>) => {
        console.log('escuxaaa');

        console.log('recibo -->>', data);
        this.loading = false;
        this.productos = data.lista;
        this.totalItems = data.totalRegistros;
      },
      error: () => { },
      complete: () => { },
    });
  }


  crearproducto(template: TemplateRef<any>) {
    this.productoSelected = new productoResponse();
    this.titleModal = "NUEVA producto";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }

  editarproducto(template: TemplateRef<any>, producto: productoResponse) {
    console.log('selec: ', producto);

    this.productoSelected = producto;
    this.titleModal = `EDITAR ${this.productoSelected.nombre}`;
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg'  // Usando una clase de tamaño grande de Bootstrap
    });
  }



  async eliminadoLogico(producto: productoResponse) {
    const result = await eliminar_registro(producto.nombre, producto.estado ? 'eliminar' : 'restaurar'); // Espera a que se resuelva la promesa
    if (result) {
      this._productoService.logicDelete(producto.id).subscribe({
        next: () => {
          if (!producto.estado) {
            this.websocketService.emit('restaurar-registro', producto);
          } else {
            this.websocketService.emit('eliminar-registro', producto.id);
          }
          alert_success(producto.estado ? 'Eliminado exitoso' : 'Restauración exitosa', `${producto.nombre} se ha ${producto.estado ? 'eliminado' : 'restaurado'}`)
          this.filtrar();
        },
        error: () => {
          //alert_error(categoria.estado?'Eliminado fallido':'Restauración fallida', `${categoria.nombre} no se ha podido ${categoria.estado?'eliminado':'restaurado'}`)
        }
      });
    }
  }

  borrarFiltros(): void {
    this.myFormFilter.reset({
      idCategoria: '',
      categoria: '',
      nombre: '',
      disponibilidad: '',
      estado: ''
    });
    this.filtrar();
  }

  changePage(event: any) {
    this.currentPage = event.page + 1; // NG Prime usa un índice basado en 0
    this.itemsPerPage = event.rows;
    this.filtrar();
  }

  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }

  cargarCategorias(): void {
    this._categoriaService.getAllWithParameters(true).subscribe({

      next: (data: CategoriaResponse[]) => {
        // Mapea las categorías a la estructura requerida por p-dropdown
        this.categorias = data.map(categoria => ({
          label: categoria.nombre, // Muestra el nombre
          value: categoria.id, // Envía el id
        }));
        console.log('Categorías activas: ', this.categorias);
      },
      error: (err) => {
        console.error('Error al cargar categorías: ', err);
      }
    });
  }

  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      //this.filtrar();
      this.rangoPrecios();
    }
  }


  /**************************************** */
  loading: boolean = true;


}
