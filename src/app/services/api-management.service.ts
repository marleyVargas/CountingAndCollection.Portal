import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiError } from '../models/api-error';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class ApiManagementService {
  
  constructor(public toastService: ToastService) {}

  public httpOptions = () => ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),    
  });

  public pipeResponse<T>(
    observable: Observable<ApiResponse<T>>
  ): Observable<T> {
    return observable.pipe(
      map(this.manageResponse),
      catchError((err) => {
        if (err instanceof ApiError) {
          err.validate &&
            this.toastService.showInfo(
              err.message != ''
                ? err.message
                : 'Problema al procesar datos en el servidor'
            );
          throw new ApiError(err.message, true);
        }

        this.toastService.showError(
          ``,
          'Estamos trabajando para ti'
        );
        console.error(
          'Error en el servidor ocurrido por: \n' +
            `codigoError: ${err.status} \n` +
            `apiUrl: ${err.url} \n` +
            `description: ${err.statusText}`
        );
        throw new ApiError(`Error en el servidor ${err}`, false);
      })
    );
  }

  private manageResponse<T>(response: ApiResponse<T>): T {
    if (response?.error) {
      throw new ApiError(response.message, true);
    }
    return response.data;
  }

  public pipeResponseFormat<T>(
    observable: Observable<ApiResponse<T>>
  ): Observable<ApiResponse<T>> {
    return observable.pipe(
      map(this.manageResponseFormat),
      catchError((err) => {
        if (err instanceof ApiError) {
          err.validate &&
            this.toastService.showInfo(
              err.message != ''
                ? err.message
                : 'Problema al procesar datos en el servidor'
            );
          throw new ApiError(err.message, true);
        }

        this.toastService.showError(
          `Error ${err.status}: ${err.statusText}`,
          'Estamos trabajando para ti'
        );
        console.error(
          'Error en el servidor ocurrido por: \n' +
            `codigoError: ${err.status} \n` +
            `apiUrl: ${err.url} \n` +
            `description: ${err.statusText}`
        );
        throw new ApiError(`Error en el servidor ${err}`, false);
      })
    );
  }

  private manageResponseFormat<T>(response: ApiResponse<T>): ApiResponse<T> {
    if (response?.error) {
      throw new ApiError(response.message, true);
    }
    return response;
  }
}
