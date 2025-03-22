export class CategoriaRequest {
  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  disponibilidad: boolean = false;
  estado: boolean = false;
  foto: File | null = null;
  urlImagen:string = ""

}
