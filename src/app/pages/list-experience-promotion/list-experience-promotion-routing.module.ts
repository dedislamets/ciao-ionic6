import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListExperiencePromotionPage } from './list-experience-promotion.page';

const routes: Routes = [
  {
    path: '',
    component: ListExperiencePromotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListExperiencePromotionPageRoutingModule {}
