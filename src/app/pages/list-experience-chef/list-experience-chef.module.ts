import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListExperienceChefPageRoutingModule } from './list-experience-chef-routing.module';

import { ListExperienceChefPage } from './list-experience-chef.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListExperienceChefPageRoutingModule,
    SharedModule
  ],
  declarations: [ListExperienceChefPage]
})
export class ListExperienceChefPageModule {}
