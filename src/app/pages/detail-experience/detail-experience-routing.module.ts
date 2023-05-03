import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailExperiencePage } from './detail-experience.page';

const routes: Routes = [
  {
    path: '',
    component: DetailExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailExperiencePageRoutingModule {}
