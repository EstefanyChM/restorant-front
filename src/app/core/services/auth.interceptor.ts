import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { alert_error } from 'src/app/shared/functions/general.functions';

import { AuthUserService } from 'src/app/auth/services/authUser.service';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { urlConstants } from '../constants/url.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthUserService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Usar 'Authorization' con A mayúscula
        }
      });
    }

    return next.handle(request).pipe(
      /************************************ */
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        //console.log('correcto', event);
          // Manejo de respuestas exitosas para códigos 200 y 201 usando switch
          switch (event.status) {
            /*case 200:
              alert_success("Operación Exitosa", "La solicitud se completó con éxito.");
              break;*/ //SINO A CADA RATO VA A DEVOLVER ESTA ALERTA
            case 201:
              if (req.url !== `${urlConstants.Cliente}natural` && req.url !== `${urlConstants.Cliente}juridica`) {
                console.log('¿la provideProtractorTestingSupport, sí deberia mostrar');

                alert_success("Creación Exitosa", "El registro se ha creado correctamente.");
              }
              break;
            case 202:
              alert_success("Aceptado", "La solicitud se ha aceptado y se está procesando.");
              break;
            case 204:
              // Generalmente no se necesita mostrar un mensaje, pero puedes incluir uno si lo deseas
              alert_success("Sin Contenido", "La solicitud se ha procesado, pero no hay contenido que mostrar.");
              break;
            default:
              break; // Para otros códigos exitosos si es necesario
          }
        }
      }),

      /************************************ */
      catchError((err: HttpErrorResponse) => {
        //console.log('error', err);

        switch (err.status) {
          /*case 400:
            alert_error("ERROR DE BAD REQUEST", "DATOS ENVIADOS INCORRECTOS");
            break;*/
          case 401:
            alert_error("SE SESIÓN HA CADUCADO", "VUELVA A REALIZAR EL LOGIN");
            this.authService.clearUser();  // Limpiar el token en caso de error 401
            this.router.navigate(['']);
            break;
          case 403:
            alert_error("PERMISOS INSUFICIENTES", "Coordine con su administrador");
            break;
          case 404:
            //alert_error("RECURSO NO ENCONTRADO", "");
            this.router.navigate(['404']);
            break;
          case 409:
            switch (err.error.codigo) {
              case '006':
                alert_error("Dato Duplicado", err.error.mensaje); // Conflicto en los datos
                break;
              case '007':
                  alert_error("Categoria no Disponible", err.error.mensaje); // Conflicto en los datos
                  break;
              default:
                alert_error("CONFLICTO", "Los datos que intentas modificar ya han sido alterados por otro proceso."); // Conflicto en los datos
                break;
            }

            console.log(err);


            break;
          case 500:
         //   if (err.url!='https://localhost:7063/api/persona/dni/720491423')
              alert_error("OCURRIO UN ERROR", "Intentelo mas tarde");

            break;
          case 0:
            alert_error("OCURRIO UN ERROR", "No podemos comunicarno con el servicio");
            break;
          default:
           // alert("ERROR NO CONTROLADO");

            alert_error("ERROR NO CONTROLADO", "Comunìquese con Sistema");
            break;
        }
        return throwError(() => err);
      })
    );
  }
}


//https://chatgpt.com/share/677f945e-9848-800c-8ace-125556bf9ceb
