import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualBookPageRoutingModule } from './manual-book-routing.module';

import { ManualBookPage } from './manual-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualBookPageRoutingModule
  ],
  declarations: [ManualBookPage]
})
export class ManualBookPageModule {}
