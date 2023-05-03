import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListExperienceProgramPage } from './list-experience-program.page';

const routes: Routes = [
  {
    path: '',
    component: ListExperienceProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListExperienceProgramPageRoutingModule {}
