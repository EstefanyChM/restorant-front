import { DetallesPromocion } from "./detalles-promocion";

export class PromocionResponse {
  id: number = 0;
  urlImagen: string = '';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  detallesPromocions: DetallesPromocion [] = [];
  descripcion: string = '';
  nombre: string = '';
  total: number  =0;
  stock: number  =0;



}
