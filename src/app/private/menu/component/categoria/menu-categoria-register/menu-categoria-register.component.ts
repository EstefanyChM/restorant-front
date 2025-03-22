import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionMantConst } from 'src/app/core/constants/general.constants';

import { CategoriaService } from '../../../service/categoria.service';
import { CategoriaResponse } from '../../../models/categoria-response.model';
import { CategoriaRequest } from '../../../models/categoria-request.model';
import { alert_success, convertToBoolean } from 'src/app/shared/functions/general.functions';
import { ProcesoEstado } from 'src/app/shared/models/ProcesoEstado';

@Component({
  selector: 'app-menu-categoria-register',
  templateUrl: './menu-categoria-register.component.html',
  styleUrl: './menu-categoria-register.component.scss'
})
export class MenuCategoriaRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() categoria: CategoriaResponse = new CategoriaResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */
  myForm: FormGroup;
  categoriaEnvio: CategoriaRequest = new CategoriaRequest();
  selectedFile: File | null = null;

  imageUrl: string = ''; // URL de la imagen a mostrar
  errorMessage: string = ''; // Definir errorMessage en el componente
  procesoEstado: ProcesoEstado = ProcesoEstado.INICIO;


  disponibilidadOptions: any[] = [
    { label: 'Disponible', value: true },
    { label: 'No Disponible', value: false },
  ];

  /**TODO: DECLARANDO EL CONSTRUCTOR */
  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
  ) {
    //nuestro formulario categoria request
    this.myForm = this.fb.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      nombre: [null, [Validators.required, Validators.minLength(3)]],
      urlImagen: [null, [Validators.required]],
      descripcion: [null, [Validators.required, Validators.minLength(5)]],
      disponibilidad: [true, [Validators.required]],
      estado: [true, [Validators.required]],
    });
  }


  ngOnInit(): void {

    this.myForm.patchValue(this.categoria);

    this.imageUrl = this.categoria.urlImagen; // Inicializar la URL de la imagen
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
    this.categoriaEnvio = this.myForm.getRawValue();
    this.categoriaEnvio.estado = convertToBoolean(this.categoriaEnvio.estado.toString());

    const formData = new FormData();
    formData.append('id', this.categoriaEnvio.id.toString());
    formData.append('nombre', this.categoriaEnvio.nombre);
    formData.append('descripcion', this.categoriaEnvio.descripcion);
    formData.append('estado', this.categoriaEnvio.estado.toString());
    formData.append('disponibilidad', this.categoriaEnvio.disponibilidad.toString());


    this.selectedFile ?
      formData.append('foto', this.selectedFile, this.selectedFile.name)
      :
      formData.append('urlImagen', this.categoriaEnvio.urlImagen);


      console.log('mandi ',this.categoriaEnvio);

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

  crearRegistro(formData: FormData) {
    console.log('id:', formData.get('id'));
      console.log('nombre:', formData.get('nombre'));
      console.log('descripcion:', formData.get('descripcion'));
      console.log('estado:', formData.get('estado'));

    this._categoriaService.createWithFormData(formData).subscribe({
      next: (data: CategoriaResponse) => {
        this.procesoEstado = ProcesoEstado.TERMINADO;
      },
      error: () => {
        this.procesoEstado = ProcesoEstado.ERROR;
      },
      complete: () => {
        this.cerrarModal(true);
      }
    });
  }


  editarRegistro(formData: FormData) {
    this._categoriaService.updateWithFormData(this.categoria.id, formData).subscribe({
      next: (data: CategoriaResponse) => {
        this.procesoEstado = ProcesoEstado.TERMINADO;
        alert_success('Edición exitosa', `${formData.get('nombre')} se ha editado correctamente'}`)
      },
      error: () => {
        this.procesoEstado = ProcesoEstado.ERROR;
      },
      complete: () => {
        this.cerrarModal(true);
      }
    });
  }


  cerrarModal(res: boolean) {
    //true ==> hubo modificación en base de datos ==> necesito volver a cargar la lista
    //false ==> NO hubo modificación en base de datos ==> NOOOOOO necesito volver a cargar la lista
    this.closeModalEmmit.emit(res);
  }

}
