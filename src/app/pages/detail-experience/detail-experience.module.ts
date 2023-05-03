import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailExperiencePageRoutingModule } from './detail-experience-routing.module';

import { DetailExperiencePage } from './detail-experience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailExperiencePageRoutingModule
  ],
  declarations: [DetailExperiencePage]
})
export class DetailExperiencePageModule {}
