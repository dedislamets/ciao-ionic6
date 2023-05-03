import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordBaruPageRoutingModule } from './password-baru-routing.module';

import { PasswordBaruPage } from './password-baru.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordBaruPageRoutingModule
  ],
  declarations: [PasswordBaruPage]
})
export class PasswordBaruPageModule {}
