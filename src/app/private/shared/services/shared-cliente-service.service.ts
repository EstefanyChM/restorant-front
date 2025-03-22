import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClienteResponse } from '../../cliente/models/cliente-response.model';
import { LegalCustomerResponse } from '../../cliente/models/legal-customer-response';
@Injectable({
  providedIn: 'root'
})

export class SharedClienteService {
  private clienteResponseSubject = new BehaviorSubject<ClienteResponse | null>(null);
  clienteResponse$ = this.clienteResponseSubject.asObservable();

  private legalCustomerResponseSubject = new BehaviorSubject<LegalCustomerResponse | null>(null);
  legalCustomerResponse$ = this.legalCustomerResponseSubject.asObservable();

  setClienteResponse(clienteResponse: ClienteResponse) {
    this.clienteResponseSubject.next(clienteResponse);
  }

  setLegalCustomerResponse(legalCustomerResponse: LegalCustomerResponse) {
    this.legalCustomerResponseSubject.next(legalCustomerResponse);
  }
}
