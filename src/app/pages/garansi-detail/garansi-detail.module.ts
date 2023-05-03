import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaransiDetailPageRoutingModule } from './garansi-detail-routing.module';

import { GaransiDetailPage } from './garansi-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaransiDetailPageRoutingModule
  ],
  declarations: [GaransiDetailPage]
})
export class GaransiDetailPageModule {}
