import { Component, OnInit, ViewChild } from '@angular/core';
import {  PageEvent } from '@angular/material/paginator';
import { VehicleService } from '../services/vehicle.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tabulated-value-report',
  templateUrl: './tabulated-value-report.component.html',
  styleUrls: ['./tabulated-value-report.component.scss']
})
export class TabulatedValueReportComponent implements OnInit {

  messageError!: string;
  totals: any;
  data!: any[];

  dateInit = new FormControl(new Date('2021-09-01'));
  dateEnd = new FormControl(new Date('2021-09-02'));

  date = new FormControl(new Date());

  constructor(
    public vehicleService: VehicleService,
  ) {    
  }

  ngOnInit(): void {

  }


  getData() {

    this.messageError = "";

    if(!this.dateInit.valid || !this.dateEnd.valid){
      this.messageError = "Por favor seleccione un rango de fechas valido";
      return;
    }

    if(!this.dateInit.value || !this.dateEnd.value){
      this.messageError = "Por favor seleccione un rango de fechas";
      return;
    }

    this.vehicleService
      .getDataByFilters(this.dateInit.value, this.dateEnd.value)
      .subscribe(
        (res) => {
          if (res) {
            this.data = res.listDates;
            this.totals = res.totals;
          }
      },error => {
        console.log(error)
        this.messageError = error;  
      });
  }
  
}
