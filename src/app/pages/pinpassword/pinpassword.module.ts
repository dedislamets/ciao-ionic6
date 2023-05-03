import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinpasswordPageRoutingModule } from './pinpassword-routing.module';

import { PinpasswordPage } from './pinpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinpasswordPageRoutingModule
  ],
  declarations: [PinpasswordPage]
})
export class PinpasswordPageModule {}
