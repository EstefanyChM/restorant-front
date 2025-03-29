import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { BuzonResponse } from '../models/buzon-response.model';
import { BuzonRequest } from '../models/buzon-request.model';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class BuzonService  extends CrudService<BuzonRequest, BuzonResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.buzon);
    console.log("Service de buzon");
  }

  getMessagesQuantity() {
    return this.http.get<number>(`${urlConstants.buzon}MessagesCount`);
  }
}
