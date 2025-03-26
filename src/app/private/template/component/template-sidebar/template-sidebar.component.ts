import { Component, OnInit} from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss']
})


export class TemplateSidebarComponent implements OnInit {
  menu: any[] = [];

  ngOnInit(): void {
    console.log("acá se ve si se muestra el dash");

    this.rellenarMenu();
  }


  rellenarMenu() {

    const token = sessionStorage.getItem('token'); // Obtiene el token del almacenamiento
    let rol: string | undefined;
    let claims: string | undefined;


    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decodifica el token
        //console.log('decodificando: ', decodedToken);

         rol = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Usar la notación de corchetes
         claims = decodedToken['esAdmin']; // Usar la notación de corchetes

      } catch (error) {
        console.error('Token inválido', error);
      }

    }

    switch (rol) {
      case "Vendedor":
        this.menu = [
          {
            name: "Módulo Venta", target: "TargetVentas", icon: "",
            subMenu: [
              { name: "Pedidos Finalizados", url: "modulo-venta/lista-venta", icon: "" },
              { name: "Ventas Delivery", url: "modulo-venta/lista-delivery", icon: "" },
              { name: "Ventas Recojo en Tienda", url: "modulo-venta/lista-pickup", icon: "" },
            ]
          }
        ];
        break;

      case "Mozo":
        this.menu = [
          {
            name: "Módulo Pedido", target: "TargetMesas", icon: "",
            subMenu: [
              { name: "Lista de Mesas", url: "modulo-pedido/lista-mesa", icon: "" },
            ]
          }
        ];
        break;

      case "Administrador":
        this.menu = [
          {
            name: "Menu", target: "TargerMenu", icon: "",
            subMenu: [
              //{ name: "Agregar Nuevo Menú", url: "menu/agregar-nuevo-menu", icon: "" },
              { name: "Productos", url: "menu/producto", icon: "" },
              { name: "Categoria", url: "menu/categoria", icon: "" },
            ]
          },
          {
            name: "Promociones", target: "TargetPromocion", icon: "",
            subMenu: [
              { name: "Agregar Nueva Promoción", url: "promocion/agregar-promocion", icon: "" },
              { name: "Lista de Promociones", url: "promocion/lista-promocion", icon: "" },
            ]
          },
          {
            name: "Módulo Pedido y Venta", target: "TargerCliente", icon: "",
            subMenu: [
              { name: "Nuevo Pedido", url: "modulo-pedido-venta/nuevo-pedido", icon: "" },
              { name: "Lista de Pedidos", url: "pedido/lista-pedido", icon: "" },
            ]
          },
          {
            name: "Módulo Pedido", target: "TargetMesas", icon: "",
            subMenu: [
              { name: "Lista de Mesas", url: "modulo-pedido/lista-mesa", icon: "" },
            ]
          },
          {
            name: "Módulo Cocina", target: "TargetCocina", icon: "",
            subMenu: [
              { name: "Pedidos", url: "modulo-cocina/pedidos-pendientes", icon: "" },
            ]
          },
          {
            name: "Módulo Venta", target: "TargetVentas", icon: "",
            subMenu: [
              { name: "Pedidos Finalizados", url: "modulo-venta/lista-venta", icon: "" },
              { name: "Ventas Delivery", url: "modulo-venta/lista-delivery", icon: "" },
              { name: "Ventas Recojo en Tienda", url: "modulo-venta/lista-pickup", icon: "" },
            ]
          },
          /*{
            name: "Cliente", target: "TargerCliente", icon: "",
            subMenu: [
              { name: "Lista de Clientes", url: "cliente/lista-clientes", icon: "" },
              { name: "Nuevo Cliente", url: "cliente/nuevo-cliente", icon: "" },
            ]
          },*/
          {
            name: "Colecciones", target: "Targer", icon: "",
            subMenu: [
              { name: "Buzón", url: "colecciones/buzon", icon: "" },
              { name: "Subscripciones", url: "colecciones/suscripcion", icon: "" },
            ]
          },
          {
            name: "Empresa", target: "TargetEmpresa", icon: "",
            subMenu: [
              { name: "Datos de la Empresa", url: "empresa/datos", icon: "" },
              { name: "Horarios", url: "empresa/horarios", icon: "" },
              { name: "Mesas", url: "empresa/mesas", icon: "" },
              { name: "Asuntos de mensaje", url: "empresa/asuntos-mensajes", icon: "" },
            ]
          },
          {
            name: "Personal", target: "TargetPersonal", icon: "",
            subMenu: [
              { name: "Personal de Empresa", url: "personal/lista", icon: "" },
              { name: "Usuarios del sistema", url: "personal/usuarios-sistema", icon: "" },

            ]
          },
          {
            name: "Ventas", target: "TargetVentas", icon: "",
            subMenu: [
              { name: "Lista de Ventas", url: "venta/lista", icon: "" },
            ]
          },
          {
            name: "Pedidos", target: "TargetPedidos", icon: "",
            subMenu: [
              { name: "Lista de Pedidos", url: "pedido/lista", icon: "" },
            ]
          }
        ];
        break;

      default:
        this.menu = [];
        break;
    }

  }






}
