export class productoResponse {
  id: number = 0;
  stock: number =1;
  nombre: string = "";//
  descripcion: string = "";//
  disponibilidad: boolean = true;//
  estado: boolean = false;//
  foto: File | null = null;//
  precio: number =0.1;
  idCategoria : number = 0;
  categoriaNombre: string = "";
  urlImagen: string = "";
  disponibilidadDescripcion: string = "";
  stockAuxiliar: number = 0; // Nueva propiedad para simular el stock ajajaja
  descuento: number=0;
  margenGanancia: number=0;


}
