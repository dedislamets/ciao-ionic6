import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.page.html',
  styleUrls: ['./list-promo.page.scss'],
})
export class ListPromoPage implements OnInit {
  param:any;
  registrationId: any;
  profile: any = [];
  arr_bulan = new Array("Januari","Februari","Maret","April", "Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
  arrList:any;
  isShow: boolean=false;

  constructor(
    public api: HelperService,
    // private screenOrientation: ScreenOrientation,
    private iab: InAppBrowser,
    private storage: StorageService,
    private router: Router,
    private routerOutlet: IonRouterOutlet
  ) { 
    const getData = storage.get('login');
    if (getData !== undefined && getData !== null) {
      this.profile = getData;
    }
  }

  ngOnInit() {
    this.load_pertama();
    
  }

  load_pertama(){
    this.param = {
      params: {},
      headers: { 'Security-Code': this.api.security_code}
    };
    this.api.getNewApi('promotions/vouchers',this.param).then(data => 
    {
      const arr:any = data;
      this.arrList = arr;
      // for(var k = 0; k < this.arrList.length; k++){ 
      //   this.arrList[k]['pa_awal'] = moment(this.arrList[k]['effective_date']).format("DD MMMM YYYY");
      //   this.arrList[k]['pa_akhir'] = (this.arrList[k]['end_date']== null ? "" : moment(this.arrList[k]['end_date']).format("DD MMMM YYYY"));
      // }
      this.load_kedua();
    });
  }

  goBack() { 
    // this.routerOutlet.pop(); 
    this.router.navigate(['/home']);
  }

  onDetails(itm:any){
    this.router.navigate(['/detail-promo',itm])
  }

  load_kedua(){
    this.param = {
      params: {},
      headers: { 'Security-Code': this.api.security_code}
    };
    this.api.getNewApi('promotions/informations',this.param).then(data => 
    {
      const arr:any = data;
      let arr_info = arr;
      let before_arr = this.arrList == undefined ? [] : this.arrList;

      // for(var k = 0; k < arr_info.length; k++){ 
      //   arr_info[k]['pa_awal'] = moment(arr_info[k]['start_date_publish']).format("DD MMMM YYYY");
      //   arr_info[k]['pa_akhir'] = (arr_info[k]['end_date_publish']== null ? "" : moment(arr_info[k]['end_date_publish']).format("DD MMMM YYYY"));
      // }
      this.arrList = [...before_arr, ...arr_info];

      if(this.arrList){
        this.isShow= true;
      }else{
        this.isShow= false;
      }
    });
  }
}
