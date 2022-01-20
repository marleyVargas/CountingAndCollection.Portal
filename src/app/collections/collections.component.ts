import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CollectionsFilter } from '../models/collections-filter';
import { VehicleService } from '../services/vehicle.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  messageError !: string;
  dateInit = new FormControl();
  dateEnd = new FormControl();
  station = new FormControl();
  hasNextPage !: boolean;
  hasPreviousPage !: boolean;

  @ViewChild(MatPaginator) set paginator(pag: MatPaginator) {
    if (pag) this.data.paginator = pag;
  }
  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) this.data.sort = sort;
  }
  
  // MatPaginator Inputs
  length = 100;
  pageSize = 5;

  // MatPaginator Output
  pageEvent!: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  
  registrosConsultados: any[] = [];
  data!: MatTableDataSource<any>;
  columnHeaders = ['queryDate','station', 'direction', 'hour', 'amount', 'tabuledValue'];
  pageSizeOptions: number[] = [];
  paginaConsulta: number = 1;
  totalRegister: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    public vehicleService: VehicleService,
  ) { }

  ngOnInit(): void {    

    this.paginaConsulta = 0;
    this.pageSize = 0;  

    this.pageSizeOptions.push(5);
    this.pageSizeOptions.push(50);
    this.pageSizeOptions.push(150);

    this.registrosConsultados = [];
    this.data = new MatTableDataSource(this.registrosConsultados);
    this.data.paginator = this.paginator;

    this.getData(1,5);    
  }

  filter(){
    this.getData(1,5);
  }

  getData(numberPage: number, pageSize: number) {
    this.messageError = "";
    this.paginaConsulta = numberPage;
    this.pageSize = pageSize;     
    this.registrosConsultados = [];

    if(!this.dateInit.valid || !this.dateEnd.valid){
      this.messageError = "Por favor seleccione un rango de fechas valido";
      return;
    }

    var filters = new CollectionsFilter(
      this.dateInit.value, 
      this.dateEnd.value,
      this.station.value,
      this.pageSize,
      this.paginaConsulta
    );

    this.vehicleService
      .getDataByFilters(filters)
      .subscribe(
        (res) => {
          if (res) {
            console.log(res)
            this.registrosConsultados = res.data;
            this.data = new MatTableDataSource(this.registrosConsultados);
            this.data.paginator = this.paginator;

            length = res.meta.totalPages;
            pageSize = res.meta.pageSize;

            this.totalRegister = res.meta.totalCount;
            this.currentPage = res.meta.currentPage;
            this.totalPages = res.meta.totalPages;
            this.pageSize = res.meta.pageSize;
            this.hasNextPage = true;
            this.hasPreviousPage = false;

            this.pageSizeOptions.push(this.totalRegister / 2);

          }
      },error => {
        console.log(error)
        this.messageError = error;  
      });
  }

  filterData(target: any) {
    const filter = (target as HTMLInputElement).value;
    this.data.filter = filter.trim().toLowerCase();
  }

  pageEventClic(pageEvent: PageEvent) {
    console.log(pageEvent)
    // if (pageEvent.length <= ((pageEvent.pageIndex + 1) * pageEvent.pageSize)) {
      this.paginaConsulta += 1;
      if(this.paginaConsulta <= this.totalPages){
        this.getData(this.paginaConsulta, pageEvent.pageSize);
      }      
    // }
  }


}
