import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import * as moment from 'moment';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-list-experience-promotion',
  templateUrl: './list-experience-promotion.page.html',
  styleUrls: ['./list-experience-promotion.page.scss'],
})
export class ListExperiencePromotionPage implements OnInit {
  param:any;
  registrationId: any;
  profile=[];
  arr_bulan = new Array("Januari","Februari","Maret","April", "Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
  arrList:any;
  isShow: boolean=false;

  constructor(
    public api: HelperService,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
    this.load_pertama();
  }

  goBack() { 
    this.router.navigate(['/home']);
  }

  goOpening() { 
    this.router.navigate(['/list-experience']);
  }

  goChef() { 
    this.router.navigate(['/list-experience-chef']);
  }

  goProgram() { 
    this.router.navigate(['/list-experience-program']);
  }

  goGallery() { 
    this.router.navigate(['/list-experience-gallery']);
  }

  load_pertama(){
    this.param = {
      params: {
        orders: 'created_at:desc'
      },
      headers: { 'Security-Code': this.api.security_code}
    };
    this.api.getNewApi('culinaria/promotions',this.param).then(data => 
    {
      const arr: any = data;
      this.arrList = arr;
      if(this.arrList){
        this.isShow= true;
      }else{
        this.isShow= false;
      }
    });
  }

  zoomin(src:any){
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    // this.screenOrientation.unlock();
    const option: InAppBrowserOptions = {
      hideurlbar: 'yes',
      toolbar: 'no',
      hardwareback: 'yes',
      useWideViewPort: 'yes',
      location: 'no',
      hidenavigationbuttons: 'yes'
    }
    const browser = this.iab.create(src,'_blank', option);
    // browser.on('exit').subscribe(event => {
    //   this.screenOrientation.lock("portrait");
    // })
  
  }

}
