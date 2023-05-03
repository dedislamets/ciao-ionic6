import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualBookPage } from './manual-book.page';

const routes: Routes = [
  {
    path: '',
    component: ManualBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualBookPageRoutingModule {}
