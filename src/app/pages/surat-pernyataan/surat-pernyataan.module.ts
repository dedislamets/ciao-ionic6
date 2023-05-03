import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuratPernyataanPageRoutingModule } from './surat-pernyataan-routing.module';

import { SuratPernyataanPage } from './surat-pernyataan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuratPernyataanPageRoutingModule
  ],
  declarations: [SuratPernyataanPage]
})
export class SuratPernyataanPageModule {}
