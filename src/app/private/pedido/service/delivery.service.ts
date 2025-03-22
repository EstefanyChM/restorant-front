import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { Delivery } from '../../colecciones/models/delivery.model';
import { CrudService } from 'src/app/core/services/crud.service';



@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends CrudService<Delivery, Delivery> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.Delivery)
  }
}
