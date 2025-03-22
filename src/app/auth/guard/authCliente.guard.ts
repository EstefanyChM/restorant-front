
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { alert_error, login_error } from 'src/app/shared/functions/general.functions';


export const authClienteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // debugger;

  let token = sessionStorage.getItem("token");
  let esPersonal = sessionStorage.getItem("esPersonal");

  console.log("desde authcleinte.guard sessins es: ", sessionStorage);
  console.log('estoy en: ', esPersonal);

  if (token && esPersonal === "NoEsPersonal") {
    return true;
  }
  alert_error('nono', 'a dónde vas mi ciela?')
  router.navigate(['']);
  return false;


};




