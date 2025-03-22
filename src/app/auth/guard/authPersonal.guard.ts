
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { alert_error, login_error } from 'src/app/shared/functions/general.functions';


export const authPersonalGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // debugger;

  let token = sessionStorage.getItem("token");
  let esPersonal = sessionStorage.getItem("esPersonal");

  console.log("desde auth.guard sessins es: ", sessionStorage);
  console.log('estoy en: ', esPersonal);


  if (token && esPersonal === "SiEsPersonal") {
    return true;
  }
  alert_error('No autorizado', 'No tienes credenciales')
  router.navigate(['auth']);
  return false;


  /*if (!token || esPersonal != 'SiEsPersonal') {
    alert_error('nono', 'a dónde vas mi ciela?')
    router.navigate(['']); // Redirigir al login si no tiene token
    return false;
  }*/
  // Si intenta acceder a ProfileModule y NO es empleado, lo bloqueamos
  /*if (state.url.includes('auth') && esPersonal !== 'NoEsPersonal') {
    alert_error('Acceso restringido', 'Solo el personal puede acceder aquí');
    router.navigate(['dashboard']); // Lo enviamos al dashboard de clientes
    return false;
  }*/
};




