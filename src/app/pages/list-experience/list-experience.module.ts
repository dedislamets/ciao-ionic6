import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListExperiencePageRoutingModule } from './list-experience-routing.module';

import { ListExperiencePage } from './list-experience.page';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListExperiencePageRoutingModule,
    SharedModule
  ],
  declarations: [ListExperiencePage]
})
export class ListExperiencePageModule {}
