import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { HelperService } from 'src/app/services/helper.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  show:boolean=false;
  url_survey: string="";
  language:any;

  constructor(
    private storage: StorageService,
    private iab: InAppBrowser,
    private api: HelperService,
    private event: EventService,
    private router: Router,
    private auth: AuthService
  ) { 
    this.event.getObservable().subscribe((data) => {
      this.load_setting();
    });
  }

  ngOnInit() {
    this.load_setting();
    this.getBahasa();
  }

  getBahasa(){

    this.api.getBahasa().then(data => 
    {
      const lang:any = data;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        this.url_survey = lang['id'].url_survey;
      }else{
        this.api.showAlert("Terjadi kesalahan pada server, silahkan coba kembali..");
      }
    });
  }

  load_setting(){
    this.show = false;
    setTimeout(() => {
      this.storage.get('login').then(result => {
        if (result != null) {
          this.show = true;
        }
      });
    }, 500);
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
  services(){
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
  survey(){
    const option: InAppBrowserOptions = {
      hideurlbar: 'yes',
      toolbar: 'no',
      hardwareback: 'yes',
      useWideViewPort: 'yes',
      location: 'no',
      hidenavigationbuttons: 'yes'
    }
    const browser = this.iab.create(this.url_survey,'_system', option);

  }

  setting(){

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
}
