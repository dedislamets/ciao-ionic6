import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinpasswordPage } from './pinpassword.page';

const routes: Routes = [
  {
    path: '',
    component: PinpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinpasswordPageRoutingModule {}
