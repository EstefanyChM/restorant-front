import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionMantConst } from 'src/app/core/constants/general.constants';

import { ProductoService } from '../../../service/producto.service';
import { productoResponse } from '../../../models/producto-response.model';
import { productoRequest } from '../../../models/producto-request.model';
import { alert_success, convertToBoolean } from 'src/app/shared/functions/general.functions';

import { CategoriaService } from '../../../service/categoria.service';
import { CategoriaResponse } from '../../../models/categoria-response.model';
import { ProcesoEstado } from 'src/app/shared/models/ProcesoEstado';


@Component({
  selector: 'app-menu-producto-register',  // Updated selector
  templateUrl: './menu-producto-register.component.html',  // Updated template URL
  styleUrls: ['./menu-producto-register.component.scss']
})
export class MenuProductoRegisterComponent implements OnInit {  // Updated class name

  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() producto: productoResponse = new productoResponse();  // Updated variable type
  @Input() accion: number = 0;

  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  /**TODO: DECLARANDO VARIABLES INTERNAS */
  myForm: FormGroup;
  productoEnvio: productoRequest = new productoRequest();  // Updated variable type
  selectedFile: File | null = null;

  imageUrl: string = ''; // URL de la imagen a mostrar
  errorMessage: string = ''; // Definir errorMessage en el componente
  procesoEstado: ProcesoEstado = ProcesoEstado.INICIO;


  disponibilidadOptions: any[] = [
    { label: 'Disponible', value: true },
    { label: 'No Disponible', value: false },
  ];

  categorias: { label: string; value: number }[] = []; // Estructura para p-dropdown


  /**TODO: DECLARANDO EL CONSTRUCTOR */
  constructor(
    private fb: FormBuilder,
    private _productoService: ProductoService,  // Updated service reference
    private _categoriaService: CategoriaService
  ) {
    // Nuestro formulario producto request
    this.myForm = this.fb.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      nombre: [null, [Validators.required, Validators.minLength(3)]],
      urlImagen: [null, [Validators.required]],
      descripcion: [null, [Validators.required, Validators.minLength(5)]],
      disponibilidad: [true, [Validators.required]],
      estado: [true, [Validators.required]],
      categoria: [null, [Validators.required]],  // Aquí asegúrate de que esté como 'categoria'
      precio: [0.5, [Validators.required, Validators.min(0.01)]], // Requerido, mínimo mayor a 0
      stock: [1, [Validators.required, Validators.min(1)]],
      margenGanancia: [0, [Validators.required, Validators.min(0), , Validators.max(100)]],

    });

  }

  ngOnInit(): void {


    this.myForm.patchValue(this.producto);
    this.cargarCategorias();
    this.imageUrl = this.producto.urlImagen; // Inicializar la URL de la imagen
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.errorMessage = ''; // Limpiar el mensaje de error previo

    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        this.errorMessage = 'Solo se permiten archivos en formato PNG, JPG o GIF.';
        return; // Detener si el tipo de archivo no es válido
      }

      // Validar tamaño del archivo
      const maxSizeInBytes = 3 * 1024 * 1024; // 4 MB
      if (file.size > maxSizeInBytes) {
        this.errorMessage = 'El tamaño del archivo no debe superar los 4 MB.';
        return; // Detener si el tamaño excede el límite
      }

      this.selectedFile = file;

      // Leer el archivo y actualizar la URL de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Actualizar el valor del campo de imagen en el formulario
      this.myForm.patchValue({ urlImagen: file });
    }
  }

  guardar() {
    this.procesoEstado = ProcesoEstado.PROCESANDO;

    this.productoEnvio = this.myForm.getRawValue();
    this.productoEnvio.estado = convertToBoolean(this.productoEnvio.estado.toString());
    this.productoEnvio.idCategoria = this.myForm.get('categoria')?.value;  // Asegúrate de obtener el valor del dropdown

    const formData = new FormData();
    formData.append('id', this.productoEnvio.id.toString());
    formData.append('nombre', this.productoEnvio.nombre);
    formData.append('descripcion', this.productoEnvio.descripcion);
    formData.append('estado', this.productoEnvio.estado.toString());
    formData.append('disponibilidad', this.productoEnvio.disponibilidad.toString());
    formData.append('idCategoria', this.productoEnvio.idCategoria.toString());  // Ahora deberías tener el idCategoria
    formData.append('precio', this.productoEnvio.precio.toString());
    formData.append('stock', this.productoEnvio.stock.toString());
    formData.append('margenGanancia', (this.productoEnvio.margenGanancia/100).toString());


    this.selectedFile ?
      formData.append('foto', this.selectedFile, this.selectedFile.name) :
      formData.append('urlImagen', this.productoEnvio.urlImagen);

      /*formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });*/

    switch (this.accion) {
      case AccionMantConst.crear:
        this.crearRegistro(formData);
        break;
      case AccionMantConst.editar:
        this.editarRegistro(formData);
        break;
      case AccionMantConst.eliminar:
        // eliminar registro
        break;
    }
  }

  cargarCategorias(): void {
    this._categoriaService.getAllWithParameters(true, true).subscribe({
      next: (data: CategoriaResponse[]) => {
        this.myForm.patchValue({
          categoria: this.producto.idCategoria, // Aquí se usa idCategoria
        });
        // Mapea las categorías a la estructura requerida por p-dropdown
        this.categorias = data.map(categoria => ({
          label: categoria.nombre, // Muestra el nombre
          value: categoria.id, // Envía el id
        }));
      },
      error: (err) => {
        console.error('Error al cargar categorías: ', err);
      }
    });
  }

  crearRegistro(formData: FormData) {
    //console.log('id:', formData.get('id'));
    //console.log('nombre:', formData.get('nombre'));
    //console.log('descripcion:', formData.get('descripcion'));
    //console.log('estado:', formData.get('estado'));

    this._productoService.createWithFormData(formData).subscribe({
      next: (data: productoResponse) => { this.procesoEstado = ProcesoEstado.TERMINADO; },
      error: () => { this.procesoEstado = ProcesoEstado.ERROR; },
      complete: () => {
        this.cerrarModal(true);
      }
    });
  }

  editarRegistro(formData: FormData) {
    this._productoService.updateWithFormData(this.producto.id, formData).subscribe({
      next: (data: productoResponse) => {
        this.procesoEstado = ProcesoEstado.TERMINADO;
        alert_success('Edición exitosa', `${formData.get('nombre')} se ha editado correctamente'}`);
      },
      error: () => {this.procesoEstado = ProcesoEstado.ERROR;  },
      complete: () => {
        this.cerrarModal(true);
      }
    });
  }

  cerrarModal(res: boolean) {
    // true ==> hubo modificación en base de datos ==> necesito volver a cargar la lista
    // false ==> NO hubo modificación en base de datos ==> NOOOOOO necesito volver a cargar la lista
    this.closeModalEmmit.emit(res);
  }
}
