import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { DeliveryResponse } from '../../colecciones/models/delivery-response.model';
import { CrudService } from 'src/app/core/services/crud.service';
import { Observable } from 'rxjs';
import { DeliveryRequest } from '../../colecciones/models/delivery-request.model';



@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends CrudService<DeliveryRequest, DeliveryResponse> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.Delivery)
  }
}
