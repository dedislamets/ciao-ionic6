import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListExperiencePromotionPageRoutingModule } from './list-experience-promotion-routing.module';

import { ListExperiencePromotionPage } from './list-experience-promotion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListExperiencePromotionPageRoutingModule
  ],
  declarations: [ListExperiencePromotionPage]
})
export class ListExperiencePromotionPageModule {}
