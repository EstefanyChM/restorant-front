import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LegalCustomerRequest } from 'src/app/private/cliente/models/legal-customer-request';
import { ClienteService } from 'src/app/private/cliente/service/cliente.service';
import { Delivery } from 'src/app/private/colecciones/models/delivery.model';
import { Pickup } from 'src/app/private/colecciones/models/pickup.model';
import { productoForm } from 'src/app/private/menu/models/producto-form.model';
import { DetallePedidoRequest } from 'src/app/private/pedido/models/detalle-pedido.model';
import { PedidoRequest } from 'src/app/private/pedido/models/pedido-request.model';
import { PagoService } from 'src/app/private/modulo-pedido-venta/service/pago.service';
import { PersonaResponse } from 'src/app/private/shared/models/persona-response.model';
import { PedidoService } from 'src/app/private/pedido/service/pedido.service';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';
import { LegalCustomerResponse } from 'src/app/private/cliente/models/legal-customer-response';
import { ClienteResponse } from 'src/app/private/cliente/models/cliente-response.model';
import { ClienteRequest } from 'src/app/private/cliente/models/cliente-request.model';
import { DeliveryService } from 'src/app/private/pedido/service/delivery.service';
import { PickupService } from 'src/app/private/pedido/service/pickup.service';
import { VentaRequest } from 'src/app/private/modulo-pedido-venta/models/venta-request';
import { VentaOnlineCrearDTO } from 'src/app/public/models/venta-online-crear-dto';
import { CarritoService } from 'src/app/private/menu/service/carrito.service';

@Component({
  selector: 'app-cart-checkout-payment',
  templateUrl: './cart-checkout-payment.component.html',
  styleUrl: './cart-checkout-payment.component.scss'
})


export class CartCheckoutPaymentComponent implements OnInit {

  selectedDocumentType: string = 'boleta'; // Valor inicial
  selectedPaymentMethod: string = 'mercadoPago';
  selectedServiceType: string = 'delivery';

  get costoDelivery(): number {
    return this.selectedServiceType === 'delivery' ? 5 : 0;
  }
  carrito: productoForm[] = [];
  total = 0;

  selectedStore: string = '';
  pickupTime: Date | null = null;

  tiendasOptions: any[] = [
    { label: 'Riccos - único', value: 1 }
  ];

  comBoletaForm: FormGroup;
  comFacturaForm: FormGroup;
  serDeliveryForm: FormGroup;
  serRecojoTiendaForm: FormGroup;
  personaResponse: PersonaResponse | null = null;
  clienteResponse: ClienteResponse | null = null;



  tiposDocumento = [
    { label: 'DNI', value: '1' },
    { label: 'Pasaporte', value: '2' },
    { label: 'Carné de Extranjería', value: '3' }
  ];



  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService,
    private _pedidoService: PedidoService,
    private _deliveryService: DeliveryService,
    private _pickupService: PickupService,
    private router: Router,
    private _clienteService: ClienteService,
        private _carritoService: CarritoService,
        private renderer: Renderer2

  )

    {
    //const navigation = this.router.getCurrentNavigation();
    //this.carrito = navigation?.extras?.state?.['carrito'] || [];



    this.comBoletaForm = this.fb.group({
      idPersonaNatural: [this.personaResponse?.idPersonaNatural, []],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      idPersonaTipoDocumento: [0, Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
    });

    this.comFacturaForm = this.fb.group({
      idPersonaJuridica: [this.personaResponse?.idPersonaJuridica,],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      razonSocial: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });

    this.serDeliveryForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(5)]],
      reference: ['', [Validators.required,Validators.minLength(3)]],
    });

    this.serRecojoTiendaForm = this.fb.group({
      PickupTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //this.subTotal();
   // console.log(this.carrito);

   this.carrito = this._carritoService.obtenerCarrito();

    this._carritoService.carritoActualizado.subscribe((carrito: productoForm[]) => {
      this.carrito = carrito;
    });


  }


  get subTotal(): number {
    return this.carrito.reduce((total, item) => {
      return total + (item.precio || 0) * (item.cantidad || 1);
    }, 0);
  }


  eliminarItem(index: number): void {
    this.carrito.splice(index, 1);
  }


  boletaEnvio: ClienteRequest = new ClienteRequest();
  facturaEnvio: LegalCustomerRequest = new LegalCustomerRequest();
  deliveryEnvio: Delivery = new Delivery();
  pickupEnvio: Pickup = new Pickup();
  pedidoEnvio: PedidoRequest = new PedidoRequest();



  private convertirCarritoADetallePedidos(carrito: productoForm[]): DetallePedidoRequest[] {

    return carrito.map((producto) => {

      return new DetallePedidoRequest(

        (producto.esPromocion? producto.id:0 )||0,
        producto.cantidad,
        producto.id || 0, // id del producto
        0,
        (producto.precio || 0) * (producto.cantidad || 1), // subtotal
        producto.precio || 0 // precio unitario
      );
    });
  }

  ventaOnlineEnvio: VentaOnlineCrearDTO = new VentaOnlineCrearDTO


  async iniciarPago() {
    // Espera a que guardarClienteJoN() termine y retorne el idCliente
    try {
      const idCliente: number | undefined = await this.guardarClienteJoN(); // Puede ser número o undefined

      const detallePedidosRequest = this.convertirCarritoADetallePedidos(this.carrito);

      this.pedidoEnvio = {
        id: 0, // Si no es necesario, puedes omitirlo o establecerlo en 0
        estado: true,
        total: 0,
        finalizado: false,
        ventaFinalizada: false,
        idServicio: this.selectedServiceType == 'delivery' ? 2 : 3, // Ajusta según sea necesario
        detallePedidosRequest: detallePedidosRequest // Aquí incluyes los detalles del pedido
      };

      if (idCliente !== undefined) {
        this.ventaOnlineEnvio.idCliente = idCliente;
      } else {
        console.error('El idCliente es undefined');
      }

      console.log('debo mandar: ', this.pedidoEnvio);


      this.ventaOnlineEnvio.miPedidoRequest = this.pedidoEnvio;
      this.ventaOnlineEnvio.idComprobante =  this.selectedDocumentType == 'boleta' ? 1 : 2,
console.log('la venta es: ', this.ventaOnlineEnvio);

      // Procesar el pago con Mercado Pago
      this.pagoService.procesarPagoMercadoPago(this.ventaOnlineEnvio).subscribe({
        next: (response) => {
          this.idpedidoRecibido = response.id;
          console.log('mi id recibido :', this.idpedidoRecibido);

          const redirectUrl = response.initPoint; // Solo necesitas la URL de redirección
          window.open(redirectUrl, '_blank'); // Abre la URL en una nueva pestaña
          this.router.navigate(['/']);

          console.log(response);

        },
        error: (err) => {
          console.error('Error al procesar el pago:', err);
          // Puedes mostrar un mensaje de error al usuario aquí si es necesario
        },
        complete: () => {
          this.guardarServicio(this.idpedidoRecibido);

        }
      });
    } catch (error) {
      console.error("Error al obtener el idCliente:", error);
    }
  }


  guardarClienteJoN(): Promise<number | undefined> {
    this.boletaEnvio = this.comBoletaForm.getRawValue();
    this.facturaEnvio = this.comFacturaForm.getRawValue();

    return new Promise((resolve, reject) => {
      switch (this.selectedDocumentType) {
        case 'boleta':
          this.boletaEnvio.idPersonaNatural = 0;

          this._clienteService.createNaturalCustomer(this.boletaEnvio).subscribe({
            next: (data: ClienteResponse) => {
              this.idClienteBack = data.id;
              console.log('1 idCliente: ', this.idClienteBack);
              resolve(this.idClienteBack); // Retorna el idClienteBack al completarse la respuesta
            },
            error: () => {
              alert("Ocurrio un error en this._clienteService.createNaturalCustomer");
              reject("Error al crear cliente natural");
            },
            complete: () => { }
          });
          break;

        case 'factura':
          this.facturaEnvio.idPersonaJuridica = 0;

          this._clienteService.createLegalCustomer(this.facturaEnvio).subscribe({
            next: (data: LegalCustomerResponse) => {
              this.idClienteBack = data.id;
              console.log('2 idCliente: ', this.idClienteBack);
              resolve(this.idClienteBack); // Retorna el idClienteBack al completarse la respuesta
            },
            error: () => {
              alert("Ocurrio un error");
              reject("Error al crear cliente jurídico");
            },
            complete: () => {
              console.log("El proceso ha finalizado");
            }
          });
          break;
        default:
          reject("Tipo de documento no válido");
          break;
      }
    });
  }

  guardarServicio(idPedido: number) {
    this.deliveryEnvio = this.serDeliveryForm.getRawValue();
    this.pickupEnvio = this.serRecojoTiendaForm.getRawValue();

    switch (this.selectedServiceType) {
      case 'delivery':
        //this.clienteEnvio.idPersonaNatural = this.personaResponse?.idPersonaNatural;
        this.deliveryEnvio.id = 0;
        this.deliveryEnvio.idPedido = idPedido
        this.deliveryEnvio.idPedidoNavigation = new PedidoRequest();
        console.log('servicio del: ',this.deliveryEnvio);

        this._deliveryService.create(this.deliveryEnvio).subscribe({
          next: (data: Delivery) => {
          },
          error: () => {
            alert("Ocurrio un error");
          },
          complete: () => { }
        });
        break;

      case 'pickup':
        this.pickupEnvio.idPedido = this.idpedidoRecibido
        this.pickupEnvio.id = 0;
        this.pickupEnvio.idPedidoNavigation = new PedidoRequest();
        //console.log('tons', this.clienteJuridicoEnvio);
        console.log('servicio pic: ',this.pickupEnvio);
        this._pickupService.create(this.pickupEnvio).subscribe({
          next: (data: Pickup) => {
          },
          error: () => {
            alert("n");

          },
          complete: () => {
            console.log("El proceso ha finalizado"); // Útil para saber que el flujo ha terminado
          }
        });
        break;
      default:
        break;
    }
  }



  idpedidoRecibido: number = 0;

  idClienteBack: number = 0;



  ngAfterViewInit() {
    // Seleccionamos todos los inputs con las clases específicas
    const inputElements = document.querySelectorAll('.p-inputtext.p-component.p-element.p-inputnumber-input.p-filled');

    // Iteramos sobre todos los inputs seleccionados y les agregamos el atributo readonly
    inputElements.forEach((inputElement) => {
      this.renderer.setAttribute(inputElement, 'readonly', 'true');
    });
  }

}
/*
http://localhost:4200/#/success?collection_id=92018226431&collection_status=approved&payment_id=92018226431&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=24607746924&preference_id=1863094664-b5215286-f47a-4ae8-898d-634d2adb6648&site_id=MPE&processing_mode=aggregator&merchant_account_id=null

*/
