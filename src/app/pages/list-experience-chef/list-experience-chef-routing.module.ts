import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListExperienceChefPage } from './list-experience-chef.page';

const routes: Routes = [
  {
    path: '',
    component: ListExperienceChefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListExperienceChefPageRoutingModule {}
