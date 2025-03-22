import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { ClienteResponse } from '../models/cliente-response.model';
import { ClienteRequest } from '../models/cliente-request.model';
import { CrudService } from 'src/app/core/services/crud.service';
import { LegalCustomerResponse } from '../models/legal-customer-response';
import { LegalCustomerRequest } from '../models/legal-customer-request';
import { OnlineUserResponse } from '../models/online-user-response.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<ClienteRequest, ClienteResponse> {

  constructor(protected http: HttpClient, )
  {
    super(http, urlConstants.Cliente);
  }

  createNaturalCustomer(request: ClienteRequest): Observable<ClienteResponse> {
    return this._http.post<ClienteResponse>(`${this.url_service}natural`, request);
  }

  createLegalCustomer(request: LegalCustomerRequest): Observable<LegalCustomerResponse> {
    console.log("mando: ", request);

    return this._http.post<LegalCustomerResponse>(`${this.url_service}juridica`, request);
  }

  getByIdOnlineUser(id:number): Observable<OnlineUserResponse> {
    console.log('weeet');
    return this._http.get<OnlineUserResponse>(`${this.url_service}OnlineUser/${id}`);
  }


}



