import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaransiFormPage } from './garansi-form.page';

const routes: Routes = [
  {
    path: '',
    component: GaransiFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaransiFormPageRoutingModule {}
