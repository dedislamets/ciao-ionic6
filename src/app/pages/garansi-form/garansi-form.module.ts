import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaransiFormPageRoutingModule } from './garansi-form-routing.module';

import { GaransiFormPage } from './garansi-form.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaransiFormPageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [GaransiFormPage]
})
export class GaransiFormPageModule {}
