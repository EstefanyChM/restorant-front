import { DetallesPromocion } from "./detalles-promocion";

export class PromocionRequest {
  id: number = 0;
  urlImagen: string = '';
  //fechaInicio: Date = new Date();
  //fechaFin: Date = new Date();
  fechaInicio: string = '';
fechaFin: string = '';
  detallesPromocions: DetallesPromocion[] = [];
  descripcion: string = '';
  nombre: string = '';
  total: number  =0;
  dctoPorcentaje:number =0;
  stock: number  =0;


}
