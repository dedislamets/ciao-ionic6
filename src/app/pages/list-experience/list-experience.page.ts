import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { StorageService } from '../../services/storage.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.page.html',
  styleUrls: ['./list-experience.page.scss'],
})
export class ListExperiencePage implements OnInit {
  param:any;
  registrationId: any;
  profile=[];
  arr_bulan = new Array("Januari","Februari","Maret","April", "Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
  arrList:any;
  isShow: boolean=false;

  constructor(private storage: StorageService,
    public api: HelperService,
    private router: Router,
    private routerOutlet: IonRouterOutlet
    ) { }

  ngOnInit() {
    this.load_pertama();
  }

  goBack() { 
    // this.routerOutlet.pop(); 
    this.router.navigate(['/home']);
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

  goPromotion() { 
    this.router.navigate(['/list-experience-promotion']);
  }

  load_pertama(){
    this.param = {
      params: {
        orders: 'created_at:desc'
      },
      headers: { 'Security-Code': this.api.security_code}
    };
    this.api.getNewApi('culinaria/events?ge=class_date:'+ moment().format("YYYY-MM-DD"),this.param).then(data => 
    {
      const arr: any = data;
      this.arrList = arr['data'];
      if(this.arrList){
        this.isShow= false;
        for(var k = 0; k < this.arrList.length; k++){ 
          this.arrList[k]['pa_awal'] = moment(this.arrList[k]['start_date_publish']).format("DD-MM-YYYY");
          this.arrList[k]['pa_akhir'] = (this.arrList[k]['class_date']== null ? "" : moment(this.arrList[k]['class_date']).format("DD MMMM YYYY"));
          this.isShow= true;
        }
      }
    });
  }

  onDetails(itm:any){
    this.router.navigate(['/detail-experience',itm])
  }

}
