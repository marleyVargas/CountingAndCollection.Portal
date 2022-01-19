import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];
  constructor(private toastr: ToastrService) {}

  showError(message: string, title = 'Error al realizar la transacción') {
    this.toastr.error(message, title)
  }

  showSuccess(message: string, title = 'Todo se ha completado exitosamente') {
    this.toastr.success(message, title)
  }

  showInfo(message: string, title = 'Error de validación') {
    this.toastr.info(message, title)
  }

  showWarning(message: string, title = 'Error de validación') {
    this.toastr.warning(message, title)
  }
}
