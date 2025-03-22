import Swal from "sweetalert2";

export function eliminar_registro(title: string, accion: string): Promise<boolean> {
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
          confirmButton: "btn btn-success mx-4",
          cancelButton: "btn btn-danger mx-4"
      },
      buttonsStyling: false
  });

  // Devuelve una promesa
  return swalWithBootstrapButtons.fire({
      title: `¿Está seguro de querer ${accion} ${title}?`,
      text: "Ya no se mostrará en la pantalla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: "No, cancelar",
      reverseButtons: true
  }).then((result) => {
      return result.isConfirmed; // Devuelve true si se confirmó, false de lo contrario
  });
}
