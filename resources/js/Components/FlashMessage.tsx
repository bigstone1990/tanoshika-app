import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useEffect } from 'react';

type FlashMessageProps = {
  flash: {
    status: string;
    message: string;
  };
}

export default function FlashMessage({flash}: FlashMessageProps) {

  useEffect(() => {
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": undefined,
      "showDuration": 300,
      "hideDuration": 1000,
      "timeOut": 5000,
      "extendedTimeOut": 1000,
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }, []);

  useEffect(() => {
    if (flash.status === 'success') {
      toastr.success(flash.message);
    }
    else if (flash.status === 'error') {
      toastr.error(flash.message);
    }
  }, [flash.status, flash.message]);

  return null;
}
