import Swal from "sweetalert2";




export function convertToBoolean(input: string): boolean {
    try {
        return JSON.parse(input.toLowerCase());
    }
    catch (e) {
        return false;
    }
}



export function alert_success(title: string, text: string) {
  Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      position: 'center',  // Cambiado a 'center' para centrar la alerta
      showConfirmButton: false,
      //   timer: timer == null || timer == undefined ? 1500 : timer
  });
}



export function alert_warning(title: string, text: string) {
    Swal.fire({
        //position: 'top-end',
        icon: 'warning',
        title: title,
        text: text,
        showConfirmButton: false,
        //   timer: timer == null || timer == undefined ? 3000 : timer
    });
}

export function alert_error(title: string, text: string) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        showConfirmButton: false,
        //   timer: 3000
    });
}

export function login_error() {
  Swal.fire({
    icon: "error",
    title: "Datos Incorrectos",
    text: "datos incorrectos",
  });
}

export function message_notification(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        iconColor: 'white',
        customClass: { popup: 'colored-toast' },
        showConfirmButton: false,
        showCloseButton: true,
      });
    
      Toast.fire({
        background: '#3fc3ee',
        html: '<i class="fa-solid fa-envelope fa-2x mr4"></i> <span>Tienes un nuevo mensaje</span>',
        title: 'Nuevo mensaje',
      });
    
}

/*********************************************** */

