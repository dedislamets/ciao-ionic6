import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListExperienceGalleryPage } from './list-experience-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: ListExperienceGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListExperienceGalleryPageRoutingModule {}
