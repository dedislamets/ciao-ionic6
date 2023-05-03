import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordBaruPage } from './password-baru.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordBaruPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordBaruPageRoutingModule {}
