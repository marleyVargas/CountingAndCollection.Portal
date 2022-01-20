import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiManagementService } from './api-management.service';
import { ToastService } from './toast.service';
import { domainTransactional } from 'src/environments/environment';
import { CollectionsFilter } from '../models/collections-filter';



const httpOptions = () => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
});

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends ApiManagementService {
  constructor(
    private http: HttpClient,
    public override toastService: ToastService
  ) {
    super(toastService);
  }

  getDataByFilters(filter: CollectionsFilter): Observable<any> {
    const url = `${domainTransactional}/Vehicle/GetCollection`;
    let json = JSON.stringify(filter);
    return (
      this.http.post<ApiResponse<any>>(url, json, httpOptions())
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }
  
  getReport(dateInit: Date, dateEnd: Date): Observable<any> {
    const url = `${domainTransactional}/Vehicle/GetReportTabulatedValue`;
    let request = {
      createdDateInit : dateInit,
      createdDateFin : dateEnd
    }
    let json = JSON.stringify(request);
    return (
      this.http.post<ApiResponse<any>>(url, json, httpOptions())
    ).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  

}
