import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoriaResponse } from 'src/app/private/menu/models/categoria-response.model';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { productoResponse } from 'src/app/private/menu/models/producto-response.model';
import { ProductsDetailsComponent } from 'src/app/shared/components/products-details/products-details.component';
import { DetallesPromocion } from '../../models/detalles-promocion';
import { PromocionService } from '../../service/promocion.service';
import { PromocionRequest } from '../../models/promocion-request.model';
import { PromocionResponse } from '../../models/promocion-response.model';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { ProductoSeleccionado } from 'src/app/shared/models/producto-seleccionado';
import { GenerarPromocionService } from '../../service/generar-promocion.service';


@Component({
  selector: 'app-promocion-crear',
  templateUrl: './promocion-crear.component.html',
  styleUrls: ['./promocion-crear.component.scss']
})
export class PromocionCrearComponent implements OnInit {

  @ViewChild('productosDetails') productosDetails!: ProductsDetailsComponent; // Referencia al hijo
  @Input() accion: number = 0;

  myForm: FormGroup;
  categoriasBack: CategoriaResponse[] = [];
  productos: productoResponse[] = [];
  filteredProducts: productoResponse[] = [];
  productosSeleccionados: DetallesPromocion[] = [];
  request: GenericFilterRequest = new GenericFilterRequest();
  promocionEnvio: PromocionRequest = new PromocionRequest();
  selectedFile: File | null = null;
  imageUrl: string = ''; // URL de la imagen a mostrar
  errorMessage: string = ''; // Definir errorMessage en el componente
  listaRecibida: ProductoSeleccionado[] = [];


  @ViewChild(ProductsDetailsComponent) productosEnPromoGeneradoPorIA!: ProductsDetailsComponent;
  @ViewChild(ProductsDetailsComponent) productoPorCategoriaEnPromoGeneradoPorIA!: ProductsDetailsComponent;




  //myForm: FormGroup; // FormGroup para manejar el formulario

  constructor(
    private _promocionService: PromocionService,
    private _generarPromocionService: GenerarPromocionService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      fechaInicio: ['', [Validators.required, this.fechaInicioValida]],
      fechaFin: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dctoPorcentaje: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      urlImagen: ['', [Validators.required]],
    }, { validators: this.validarRangoFechas });
  }

  fechaInicioValida(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaIngresada = new Date(control.value);

    return fechaIngresada < hoy ? { fechaInicioInvalida: true } : null;
  }

  validarRangoFechas(formGroup: AbstractControl): ValidationErrors | null {
    const fechaInicio = new Date(formGroup.get('fechaInicio')?.value);
    const fechaFin = new Date(formGroup.get('fechaFin')?.value);

    if (!fechaInicio || !fechaFin) return null; // Si no hay fechas, no validar

    // 1. Verificar que fechaInicio < fechaFin
    if (fechaInicio >= fechaFin) {
      return { fechaOrdenInvalida: true };
    }

    // 2. Verificar que la diferencia no sea mayor a 1 mes
    const unMesDespues = new Date(fechaInicio);
    unMesDespues.setMonth(unMesDespues.getMonth() + 1);

    if (fechaFin > unMesDespues) {
      return { diferenciaExcedeUnMes: true };
    }

    return null; // Todo está correcto
  }




  ngOnInit() {

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

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Asegura que tenga 2 dígitos
    const day = String(d.getDate()).padStart(2, '0'); // Asegura que tenga 2 dígitos
    return `${year}-${month}-${day}`;
  }

  crearPromoConIA(): void {
    this.productosEnPromoGeneradoPorIA.displayAlert();
  }
  crearPromoConIAPorIdCat(): void {
    this.productoPorCategoriaEnPromoGeneradoPorIA.displayAlertParaCategoria();
  }


  crear() {
    const formDataPaLaImagen = new FormData();

    this.selectedFile ?
      formDataPaLaImagen.append('foto', this.selectedFile, this.selectedFile.name) :
      formDataPaLaImagen.append('urlImagen', this.promocionEnvio.urlImagen);

    this.promocionEnvio = this.myForm.getRawValue();
    this.promocionEnvio.urlImagen = 'AUN NADA';

    // Convertir las fechas a formato 'YYYY-MM-DD'
    this.promocionEnvio.fechaInicio = this.formatDate(this.promocionEnvio.fechaInicio);
    this.promocionEnvio.fechaFin = this.formatDate(this.promocionEnvio.fechaFin);

    this.promocionEnvio.detallesPromocions = this.convertirADetallesPromocion(this.listaRecibida);

    this._promocionService.create(this.promocionEnvio).subscribe({
      next: (data: PromocionResponse) => {
        console.log('recibo:', data);
        console.log('mandaré: ', formDataPaLaImagen);


        this._promocionService.subirImagenPromo(data.id, formDataPaLaImagen).subscribe({
          next: () => { }
        })

      }
    })

    console.log(this.promocionEnvio);
  }


  crearRegistro(formData: FormData) {
    console.log('id:', formData.get('id'));
    console.log('nombre:', formData.get('nombre'));
    console.log('descripcion:', formData.get('descripcion'));
    //console.log('estado:', formData.get('estado'));


    // Update service call to use PromocionService
    this._promocionService.createWithFormData(formData).subscribe({
      next: (data: PromocionResponse) => {
      },
      error: () => {
      },
      complete: () => { }
    });
  }

  editarRegistro(formData: FormData) {
    // Update service call to use PromocionService
    this._promocionService.updateWithFormData(this.promocionEnvio.id, formData).subscribe({
      next: (data: PromocionResponse) => {
        alert_success('Edición exitosa', `${formData.get('nombre')} se ha editado correctamente`);
      },
      error: () => { },
      complete: () => { }
    });
  }


  convertirADetallesPromocion(pedidos: ProductoSeleccionado[]): DetallesPromocion[] {
    return pedidos.map(pedido => {
      return {
        id: 0, // Valor predeterminado o ajusta según tu necesidad
        idPromocion: 0, // Ajusta este valor si es necesario
        idProducto: pedido.idProducto,
        cantidad: pedido.cantidad,
        subTotal: pedido.precioXCant,
        precioUnitario: pedido.precioUnitario,
        porcentajeDescuentoPorUnidad: pedido.descuento
      } as DetallesPromocion;
    });
  }




  dateLessThan(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaInicio = this.myForm?.get('fechaInicio')?.value;
    const fechaFin = control.value;
    return fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)
      ? { dateLessThan: true }
      : null;
  }

  recibirLista(lista: ProductoSeleccionado[]) {
    this.listaRecibida = lista; // Actualizar la lista recibida
    console.log('Lista recibida del hijjo:', this.listaRecibida);
  }


  recibirPorcentajeDescuentoTotal(porcentaje: number) {
    this.porcentajeDescuentoTotalPromo= porcentaje;
  }
  porcentajeDescuentoTotalPromo : number= 0


  descuentoTotalPromo : number= 0
  recibirDescuentoTotal(descuento: number) {
    this.descuentoTotalPromo= descuento;
  }

  listaDetallesPromocion: DetallesPromocion[] = this.listaRecibida.map((pedido) => {
    return {
      id: 0,
      idPromocion: 0,
      idProducto: pedido.idProducto,
      cantidad:pedido.cantidad,
      subTotal: 0,
      precioUnitario: 0,
      porcentajeDescuentoPorUnidad:pedido.descuento
    } as DetallesPromocion;
  });

  uploadedImageUrl: string | ArrayBuffer | null = null;

  onUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && e.target.result !== undefined) {
        this.uploadedImageUrl = e.target.result;
      }
    };

    reader.readAsDataURL(file);
  }
}
