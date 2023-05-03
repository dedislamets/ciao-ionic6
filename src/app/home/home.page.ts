import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams, AlertController, Platform  } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from '../services/storage.service';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userProfile: any = null;
  public param:any;
  label_welcome:string = "";
  language:any;
  nama:string ="";
  konsumen_id:string = "";
  public alertShown:boolean=false;

  constructor(
    private storage: StorageService,
    private iab: InAppBrowser,
    public api: HelperService,
    private alertCtrl: AlertController,
    private router: Router,
    private events: EventService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loadLang();
    
    this.load_master_dealer();
    this.events.getObservable().subscribe((data) => {
      if(data.refresh_profile ){
        this.load_profil_pengguna(this.konsumen_id);
      }
    });
  }
  ionViewDidEnter(){
    this.cek_app_update();
    setTimeout(() => {
      this.storage.get('login').then(result => {
        if (result != null) {
          this.konsumen_id = result['konsumen_id'];
          this.load_profil_pengguna(result['konsumen_id']);
          // this.events.publish('setting:created',Date.now());
          this.events.publishSomeData({
            setting: Date.now()
          });
        }
      })
    }, 1000);
  }
  ngOnInit() {
    
    
  }

  register(){
    this.router.navigate(['/list-garansi'])
  }
  
  experience(){
    this.router.navigate(['/list-experience'])
  }

  promo(){
    this.router.navigate(['/list-promo'])
  }
  news(){
    const option: InAppBrowserOptions = {
      hideurlbar: 'yes',
      toolbar: 'no',
      hardwareback: 'yes',
      useWideViewPort: 'yes',
      location: 'no',
      hidenavigationbuttons: 'yes'
    }
    const browser = this.iab.create('https://www.modena.com/id_id/news-room/blogs','_blank', option);
  }
  service(){
    const option: InAppBrowserOptions = {
      hideurlbar: 'yes',
      toolbar: 'no',
      hardwareback: 'yes',
      useWideViewPort: 'yes',
      location: 'no',
      hidenavigationbuttons: 'yes'
    }
    const browser = this.iab.create('https://www.modena.com/id_id/service/service-center','_blank', option);
  }

  cek_app_update(){
    this.param = {
      params: {
        ws: 'appver',
        lv: this.api.versi,
      }
    };
    this.api.getApi(this.param).then(async msg => 
    {
      let test:any = {};
      test = msg;
      if( test.update == 1 ){
        let alert = await this.alertCtrl.create({
            header: 'Aplikasi terbaru sudah tersedia.\nUpdate aplikasi?',
            message: '',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  // window.location.replace(test['url'])
                  window.open('market://details?id=id.co.modena.ciaomodena', '_system');
                }
              }]
        });
        await alert.present();
       
      }
    });
  }

  load_profil_pengguna(konsumen_id: any){
    this.param = {
      params: {
        ws: 'memberprofil',
        memberid: konsumen_id,
      }
    };
    this.api.getApi(this.param)
    .then(msg => 
    {
      const data_profile:any = msg;
      if(data_profile.length>0){
        this.nama = data_profile[0]['name'];
        this.userProfile = data_profile[0]['name'];
      }
    });
    
  }

  loadLang(){
    this.api.getBahasa().then(data => 
    {
      const lang: any = data;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        this.label_welcome = lang['id'].umum.label_welcome;
      }else{
        if(lang['error']['isTrusted']){
          this.api.showAlertString(lang['error']);
        }
        
      }
    });

    
  }

  load_master_dealer(){
    this.param = {
      params: {
        c: 'load_dealer',
      }
    };
    this.api.getCSApi(this.param).then(data => 
    {
      this.storage.set('master_dealer',data);
    });
  }

  onlineshop(){
    const option: InAppBrowserOptions = {
      hideurlbar: 'yes',
      toolbar: 'no',
      hardwareback: 'yes',
      useWideViewPort: 'yes',
      location: 'no',
      hidenavigationbuttons: 'yes'
    }
    const browser = this.iab.create('https://linktr.ee/MODENAIndonesia','_blank', option);
  }

}


