import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/login/login.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [FooterComponent, MenuComponent, LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [FooterComponent, MenuComponent, LoginComponent ],
})
export class SharedModule { }
