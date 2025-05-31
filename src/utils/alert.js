import Swal from 'sweetalert2';
const successAlert = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });
};

const errorAlert = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });
};

const warningAlert = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });
};

export { errorAlert, successAlert, warningAlert };
