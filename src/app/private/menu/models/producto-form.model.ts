export class productoForm {
  id: number | null = null;
  nombre: string | null = null;
  urlImagen: string | null = null;
  descripcion: string | null = null;
  precio: number | null = null;
  categoria: string | null = null;
  cantidad: number = 1;
  stockDelProducto: number = 0;
  precioTotal?: number;
  esPromocion: boolean = false

  toString(): string {
    return `
    ID: ${this.id},
    Nombre: ${this.nombre || ''},
    UrlImagen: ${this.urlImagen || ''},
    Descripcion: ${this.descripcion || ''},
    Precio: ${this.precio || 0},
    Categoria: ${this.categoria || ''},
    Cantidad: ${this.cantidad}
    EsPromocion: ${this.esPromocion}}`;
  }
}
