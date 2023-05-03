import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListExperiencePage } from './list-experience.page';

const routes: Routes = [
  {
    path: '',
    component: ListExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListExperiencePageRoutingModule {}
