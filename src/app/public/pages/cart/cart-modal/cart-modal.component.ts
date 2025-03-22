import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/auth/services/authUser.service';
import { productoForm } from 'src/app/private/menu/models/producto-form.model';
import { CarritoService } from 'src/app/private/menu/service/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.scss'
})
export class CartModalComponent implements OnInit {
  @Output() closeCartM = new EventEmitter<void>();  // Evento para cerrar el modal de login
  @Output() openCart = new EventEmitter<void>(); // Evento para abrir el modal de registro
  @Output() openLoginModalFR = new EventEmitter<void>();  // Evento para cerrar el modal de login


  carrito: productoForm[]=[];

  constructor(
    private _carritoService: CarritoService,
    private router: Router,
    private _authUserService: AuthUserService,
          private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.carrito = this._carritoService.obtenerCarrito();

    this._carritoService.carritoActualizado.subscribe((carrito: productoForm[]) => {
      this.carrito = carrito;
    });

  }

  quitar(index: number): void {
    this.carrito.splice(index, 1);
    this._carritoService.actualizarCarrito(this.carrito);
  }

  realizarCompra() {
    this.cerrarModal();
    if (this._authUserService.getUserId() == null) {
      Swal.fire({
        title: "¿Cómo te gustaría realizar tu compra?",
        showDenyButton: true,
        confirmButtonText: "Iniciar sesión",
        denyButtonText: `Continuar sin iniciar sesión`
      }).then((result) => {
        if (result.isConfirmed) {
          this.openLoginModalFR.emit();
        } else if (result.isDenied) {
          this.router.navigate(['/cart/checkout-payment'], { state: { carrito: this.carrito } });
        }
      });
    }
    else{
      this.router.navigate(['/cart/checkout-payment'], { state: { carrito: this.carrito } });
    }
  }

  get subtotal(): number {
    return this.carrito.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 1), 0);
  }



  tiendasOptions: any[] = [
    { label: 'Riccos - único', value: 1 }
  ];

  /********************************** */

cerrarModal(){
  console.log('hay que cerrar');

  this.closeCartM.emit();
}

ngAfterViewInit() {
  // Seleccionamos todos los inputs con las clases específicas
  const inputElements = document.querySelectorAll('p-inputtext.p-component.p-element.p-inputnumber-input.p-filled');
console.log('******');

  console.log(inputElements);

  // Iteramos sobre todos los inputs seleccionados y les agregamos el atributo readonly
  inputElements.forEach((inputElement) => {
    this.renderer.setAttribute(inputElement, 'readonly', 'true');
  });
}

}



