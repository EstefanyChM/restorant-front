import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/private/menu/service/categoria.service';
import { CategoriaResponse } from 'src/app/private/menu/models/categoria-response.model';
import { ProductoService } from 'src/app/private/menu/service/producto.service';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { productoResponse } from 'src/app/private/menu/models/producto-response.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';
import { ProductoSeleccionado } from '../../models/producto-seleccionado';
import Swal from 'sweetalert2';
import { GenerarPromocionService } from 'src/app/private/promocion/service/generar-promocion.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})


export class ProductsDetailsComponent implements OnInit {
  @Output() listaActualEmitida = new EventEmitter<ProductoSeleccionado[]>();
  @Output() porcentajeDescuentoTotalEmitido = new EventEmitter<number>();
  @Output() descuentoTotalEmitido = new EventEmitter<number>();
  @Output() showAlert = new EventEmitter<void>();
  @Output() porcentajeDescuentoCombo = new EventEmitter<number>();

  categoriasBack: CategoriaResponse[] = [];
  productosDeLaCategoria: productoResponse[] = [];
  filteredProducts: productoResponse[] = [];
  request: GenericFilterRequest = new GenericFilterRequest();

  myForm: FormGroup = this.fb.group({});

  categoriaSeleccionada: CategoriaResponse = new CategoriaResponse;
  productoSeleccionado: productoResponse = new productoResponse;
  pedidoAAgregar:
    ProductoSeleccionado = new ProductoSeleccionado;
  listaActual: ProductoSeleccionado[] = [];


  constructor(
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService,
    private _promocionService: GenerarPromocionService,
    private fb: FormBuilder
  ) {
    this.inicializarFormulario();
  }



  displayAlert() {

    Swal.fire({
      title: "¿Cuántos productos desea agregar?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Generar",
      showLoaderOnConfirm: true,
      preConfirm: async (cantidad) => {
        cantidad = Number(cantidad); // Convertir a número
        if (isNaN(cantidad) || cantidad <= 0) {
          Swal.showValidationMessage("Ingrese un número válido mayor a 0");
          return false;
        }
        /*
        *El método preConfirm de SweetAlert2 es una función async que espera una promesa antes de confirmar el proceso.
        *preConfirm espera un valor de retorno para proceder con la confirmación.
        *subscribe() no devuelve nada, solo ejecuta código cuando hay una respuesta.
        *SweetAlert2 no esperaría a que la API termine, lo que causaría problemas.
        */
        try {
          const result = await firstValueFrom(this._promocionService.obtenerListaProductos(cantidad));
          console.log("🔹 Respuesta del servicio:", result); // 👀 Ver en consola
          this.listaActual.push(...result.productosSeleccionados);
          console.log("completar con :", this.listaActual);
          console.log( this.listaActual);
          console.log ('sssssssssssss');

          this.emitirLista();
          return result;
        } catch (error) {
          console.error("❌ Error en la solicitud:", error); // 👀 Ver errores en consola
          //Swal.showValidationMessage(`Error en la solicitud: ${error.message}`);
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Combo de descuento Completado`,
        });
      }
    });




    //acá me susccribo a la IA de las promos
    /*this.listaActual = [
      {idProducto: 1,
        nombreProducto : "aaa",
        cantidad: 2,
        precioXCant: 20, // cantidad * precio unitario
        precioUnitario: 10,
        descuento: 0

      },
      {idProducto: 2,
        nombreProducto : "bbb",
        cantidad: 3,
        precioXCant: 45, // cantidad * precio unitario
        precioUnitario: 15,
        descuento: 0

      },
      {idProducto: 3,
        nombreProducto : "ccc",
        cantidad: 5,
        precioXCant: 40, // cantidad * precio unitario
        precioUnitario: 8,
        descuento: 0

      }
    ];*/
  }


  displayAlertParaCategoria() {
    Swal.fire({
      title: "Seleccione una Categoría",
      html: `
        <select id="categoriaDropdown" class="swal2-input">
          ${this.categoriasBack.map(cat => `<option value="${cat.id}">${cat.nombre}</option>`).join("")}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Generar",
      preConfirm: async () => {
        const selectElement = document.getElementById("categoriaDropdown") as HTMLSelectElement;
        const categoriaSeleccionada = selectElement.value;

        if (!categoriaSeleccionada) {
          Swal.showValidationMessage("Debe seleccionar una categoría");
          return false;
        }
        console.log('MANDANDO LA CAT: ', categoriaSeleccionada);

        try {
          const result = await firstValueFrom(this._promocionService.obtenerProductoPorIdCategoria(+categoriaSeleccionada));
          console.log("🔹 Respuesta del servicio:", result);

          // Agregar los productos nuevos a la lista existente
          this.listaActual.push(...result.productosSeleccionados);
          console.log('***** ', this.listaActual);



          this.emitirLista();
          return result;
        } catch (error) {
          console.error("❌ Error en la solicitud:", error);
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Producto para Descuento Completado`,
        });
      }
    });
  }





  inicializarFormulario() {
    this.myForm = this.fb.group({
      categoria: [null, Validators.required],
      producto: [null, Validators.required],
      cantidad: [1, [
        Validators.required,
        Validators.min(1),
        this.cantidadMaximaValidator.bind(this)
      ]],
      /*descuento: [1, [
        //Validators.required,
        Validators.min(0),
        this.descuentoMaximaValidator.bind(this)
      ]]*/
    });
  }



  // Validador personalizado que verifica que la cantidad no exceda el stock
  cantidadMaximaValidator(control: AbstractControl): { [key: string]: any } | null {
    //console.log('Validando cantidad:', control.value, 'Stock:', this.productoSeleccionado?.stock);
    //if (this.productoSeleccionado && control.value > this.productoSeleccionado.stock) {
    if ((this.productoSeleccionado && control.value > this.productoSeleccionado.stock) &&
      0 < 1) {

      return { 'max': true }; // La cantidad es mayor que el stock
    }
    return null;
  }


  // Validador personalizado que verifica que el descuento no exceda el stock
  descuentoMaximaValidator(control: AbstractControl): { [key: string]: any } | null {
    //if (this.productoSeleccionado && control.value > this.productoSeleccionado.stock) {
    if ((this.productoSeleccionado && control.value > this.productoSeleccionado.descuento) &&
      0 < 1) {

      return { 'max': true }; // La cantidad es mayor que el stock
    }
    return null;
  }


  seleccionarProducto() {
    this.productoSeleccionado = this.myForm.get('producto')?.value;
  }



  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this._categoriaService.getAllWithParameters(true, true).subscribe({
      next: (data: CategoriaResponse[]) => {
        this.categoriasBack = data;
      },
      error: (err) => {
        console.error('Error al obtener categorías', err);
      }
    });
  }

  seleccionarCategoria() {
    this.categoriaSeleccionada = this.myForm.get('categoria')?.value;
    this.CompletarProductos();
  }

  CompletarProductos() {
    this._productoService.getAllWithParameters(true, true, this.categoriaSeleccionada.id).subscribe({
      next: (data: productoResponse[]) => {
        this.productosDeLaCategoria = data;
      },
      error: () => { },
      complete: () => { }
    })
  }

  searchProduct(event: any) {
    const query = event.query.toLowerCase();
    this.filteredProducts = this.productosDeLaCategoria.filter(product =>
      product.nombre.toLowerCase().includes(query)
    );
  }

  onAgregar() {
    if (this.myForm.valid) {

      const producto = this.productoSeleccionado
      const cantidad = this.myForm.get('cantidad')?.value;
      const precioUnitario = this.productoSeleccionado.precio
      const precioXCant = this.productoSeleccionado.precio * cantidad;

      this.pedidoAAgregar = {
        idProducto: producto.id,
        nombreProducto: producto.nombre,
        cantidad: cantidad,
        precioUnitario: precioUnitario,
        precioXCant: precioXCant,
        descuento: 0,
        porcentajeDescuentoPorUnidad:0

      }
      this.inicializarFormulario();

      const productoEncontrado = this.listaActual.find(producto => producto.idProducto === this.productoSeleccionado.id);
      if (productoEncontrado != undefined) { // o sea ya esta en el array solo hay que modificar la cantidad
        productoEncontrado.cantidad += cantidad;
      } else {
        this.listaActual.push(this.pedidoAAgregar);
      }
      this.emitirLista();
    }
  }

  calcularTotal(): number {
    const total = this.listaActual.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
    return total
  }

  calcularTotalConDescuento(): number {
    const totalConDescuento = this.listaActual.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario*(1-item.descuento)), 0);
    return Math.ceil(totalConDescuento)
  }

  calcularPorcentajeDeDescuentoTotal():number {
    const porcentajeDescuentoCombo = Math.ceil(100-(100*this.calcularTotalConDescuento()/this.calcularTotal()))
  return porcentajeDescuentoCombo;
  }


  eliminarProducto(index: number) {
    const productoEliminado = this.listaActual[index];
    //this.calcularTotal() -= productoEliminado.precioXCant; // Restar el precio del total
    this.listaActual.splice(index, 1);
    this.emitirLista();
  }

  emitirLista() {
    this.listaActualEmitida.emit(this.listaActual); // Emitir la lista actual
    this.porcentajeDescuentoTotalEmitido.emit(this.calcularPorcentajeDeDescuentoTotal()); // Emitir la lista actual
    this.descuentoTotalEmitido.emit(this.calcularTotalConDescuento()); // Emitir la lista actual
  }
  //CUANDO EL PADRE HAGA ALGO, ESTE COMPONENTE SIEMPRE ES PARTE DE OTRO, es un hijo
  vaciarLista() {
    console.log('VACIAR');
    this.listaActual = []; // Vaciar la lista
    //this.total = 0; // Restablecer el total
    this.emitirLista(); // Emitir la lista vacía
  }
}
