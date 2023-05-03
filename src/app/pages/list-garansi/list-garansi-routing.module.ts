import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListGaransiPage } from './list-garansi.page';

const routes: Routes = [
  {
    path: '',
    component: ListGaransiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListGaransiPageRoutingModule {}
