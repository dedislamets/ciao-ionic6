import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListGaransiPageRoutingModule } from './list-garansi-routing.module';

import { ListGaransiPage } from './list-garansi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListGaransiPageRoutingModule
  ],
  declarations: [ListGaransiPage]
})
export class ListGaransiPageModule {}
