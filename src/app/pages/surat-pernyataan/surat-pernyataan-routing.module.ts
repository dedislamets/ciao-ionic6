import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuratPernyataanPage } from './surat-pernyataan.page';

const routes: Routes = [
  {
    path: '',
    component: SuratPernyataanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuratPernyataanPageRoutingModule {}
