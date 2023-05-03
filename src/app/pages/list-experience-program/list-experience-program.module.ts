import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListExperienceProgramPageRoutingModule } from './list-experience-program-routing.module';

import { ListExperienceProgramPage } from './list-experience-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListExperienceProgramPageRoutingModule
  ],
  declarations: [ListExperienceProgramPage]
})
export class ListExperienceProgramPageModule {}
