import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  parametros: any;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    // Manejo de parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.parametros = {
        status: params['status'],
        payment_id: params['payment_id'],
        payment_type: params['payment_type'],
        merchant_order_id: params['merchant_order_id'],
      };

      if (this.parametros.status === 'approved') {
        this.updatePaymentStatus(this.parametros.merchant_order_id, this.parametros.payment_id, this.parametros.status);
      } else {
        console.error('El pago no fue aprobado:', this.parametros.status);
      }
    });

  }

  updatePaymentStatus(orderId: string, paymentId: string, status: string) {
    console.log('Estado de pago:', orderId, paymentId, status);
  }
}
