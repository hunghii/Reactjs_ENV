import { toast } from 'react-toastify';
const toastOptions = {
  autoClose: 3000,
  hideProgressBar: true,
};
export class Ui {
  static showErrors(messages) {
    messages.forEach(x => {
      if (!Array.isArray(x)) {
        toast.error(x, {
          ...toastOptions,
          className: 'toast-error',
        });
      } else {
        x.forEach(y =>
          toast.error(y, {
            ...toastOptions,
            className: 'toast-error',
          }),
        );
      }
    });
  }

  static showError({ message, options }) {
    toast.error(message, {
      ...toastOptions,
      ...options,
      className: 'toast-error',
    });
  }

  static showInfo({ message, options }) {
    toast.info(message, {
      ...toastOptions,
      ...options,
      className: 'toast-info',
    });
  }

  static showSuccess({ message, options }) {
    toast.success(message, {
      ...toastOptions,
      ...options,
      className: 'toast-success',
    });
  }

  static showWarning({ message, options }) {
    toast.warn(message, {
      ...toastOptions,
      ...options,
      className: 'toast-warning',
    });
  }
}
