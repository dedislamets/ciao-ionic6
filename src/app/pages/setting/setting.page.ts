import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileFormPage } from '../profile-form/profile-form.page';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
    private storage: StorageService,
    private event: EventService,
    private router: Router,
    private auth: AuthService,
    private modalCtrl: ModalController
  ) { 
    
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.storage.remove('login');
    // this.events.publish('setting:created',Date.now());
    this.event.publishSomeData({
      setting: Date.now()
    });
    this.router.navigate(['/login'])
  }
  async profile(){
    let modal = await this.modalCtrl.create({
      component: ProfileFormPage
    });
    
    modal.present();
  }

  goBack() { 
    this.router.navigate(['/home']);
  }

}
