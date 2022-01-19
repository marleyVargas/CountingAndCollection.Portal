import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabulatedValueReportComponent } from './tabulated-value-report/tabulated-value-report.component';

const routes: Routes = [
  {
    path: '',
    component: TabulatedValueReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
