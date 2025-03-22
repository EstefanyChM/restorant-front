export class productoRequest {

  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  disponibilidad: boolean = true;
  estado: boolean = false;
  foto: File | null = null;
  precio: number = 0;
  stock: number = 0;
  idCategoria : number = 0;
  categoriaNombre: string = "";
  urlImagen: string = "";
  margenGanancia: number=0;
}
