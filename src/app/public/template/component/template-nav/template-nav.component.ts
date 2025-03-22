import { Component, OnInit, TemplateRef } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Solo importa lo necesario

import { CategoriaService } from 'src/app/private/menu/service/categoria.service';
import { CategoriaResponse } from 'src/app/private/menu/models/categoria-response.model';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/auth/services/authUser.service';
import { ClienteService } from 'src/app/private/cliente/service/cliente.service';
import { filter, switchMap } from 'rxjs';
import { OnlineUserResponse } from 'src/app/private/cliente/models/online-user-response.model';
import { CarritoService } from 'src/app/private/menu/service/carrito.service';
import { productoForm } from 'src/app/private/menu/models/producto-form.model';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-template-nav',
  templateUrl: './template-nav.component.html',
  styleUrls: ['./template-nav.component.scss']
})


export class TemplateNavComponent implements OnInit {
  modalRef?: BsModalRef;
  titleModal: string = "";
  accionModal: number = 0;

  form: FormGroup;

  categoriasBack: CategoriaResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private router: Router,
    private _authUserService: AuthUserService,
    private _clienteService: ClienteService,
    private _userService: UserService,
    private _carritoService: CarritoService,
  ) {
    this.form = this.fb.group({
      categorias: this.fb.array([])
    });
  }
  menu: any[] = [];
  nombreDeUsuario: string = "";

  carritoCanti: number = 0;


  ngOnInit(): void {

    this.carritoCanti = this._carritoService.obtenerCarrito().length;//mientras no se suscriba a carritoService

    this._carritoService.carritoActualizado.subscribe(
      (carrito: productoForm[]) => {
      this.carritoCanti = carrito.length;
      console.log('esto puedo ver del ngOnInit navbar ',this.carritoCanti);
    });

    if (this._authUserService.getUserId()!= null) {
      this._clienteService.getByIdOnlineUser (this._authUserService.getUserId()!).subscribe({ next:(data)=> this.nombreDeUsuario=data.nombre!})
    }

    this._userService.usuarioActualizado.subscribe(
      (nombresito:string) => {
        this.nombreDeUsuario = nombresito, console.log('te iamas: ', nombresito);
      }
    );

    this._categoriaService.getAllWithParameters(true).subscribe({
      next: (data: CategoriaResponse[]) => {
        this.categoriasBack = data
        this.cargarMenu();
      },
    });
  }


  cerrarSesion() {
    this._authUserService.clearUser();
        //this.usuarioLogueado = '';
        // Aquí agregar lógica para cerrar sesión
      }

  cargarMenu() {
    this.menu = [
      { name: "Home", url: "" },
      { name: "Nosotros", url: "about" },
      { name: "Servicios", url: "our-services" },
      {
        name: "Menu",
        subMenu: this.categoriasBack?.map(categoria => ({
          name: categoria.nombre,
          id: categoria.id
        }))
      },
      { name: "Promociones", url: "promotions" },


      { name: "Contáctanos", url: "contact" },
      /*this.usuarioLogueado ?
        { name: this.usuarioLogueado, url: "perfil" } :
        { name: "Iniciar Sesión" }*/
    ];
  }


  optionClick(id: number): void {
    console.log('/menu/productos', id);
    this.router.navigate(['/menu/productos', id]);
  }


  menuItems = [
    { label: 'Ver Perfil', icon: 'pi pi-user', routerLink: '/perfil' },
    { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.cerrarSesion() }
  ];





  displayLoginDialog: boolean = false; // Login modal inicialmente oculto
  displayRegisterDialog: boolean = false; // Register modal inicialmente oculto

  openLoginModal() {
    console.log('abro el login');

    this.displayLoginDialog = true; // Abre el modal de login
  }

  closeLoginModal() {
    this.displayLoginDialog = false;
  }

  openRegisterModal() {
    this.displayRegisterDialog = true;
  }

  closeRegisterModal() {
    this.displayRegisterDialog = false;
  }

  openCartModal() {
    this.displayCartDialog = true;
    console.log('abrete carrt');
  }

  closeCartModal() {
    this.displayCartDialog = false;
  }
  displayCartDialog: boolean = false;



}


