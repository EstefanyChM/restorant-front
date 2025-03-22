export class PedidoMesaResponse {
    idEnTienda: number = 0;
    idMesa: number = 0;
    nroMesa: number = 0;
    disponible: boolean = false;
    finalizado: boolean = false;
    idPedido?: number | null = null; // Inicializado como null, pero opcional
    total?: number | null = null;
}
