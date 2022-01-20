import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { IndexComponent } from './index/index.component';
import { TabulatedValueReportComponent } from './tabulated-value-report/tabulated-value-report.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'Report',
    component: TabulatedValueReportComponent
  },
  {
    path: 'Collections',
    component: CollectionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
