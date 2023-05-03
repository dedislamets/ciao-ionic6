import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-list-experience-program',
  templateUrl: './list-experience-program.page.html',
  styleUrls: ['./list-experience-program.page.scss'],
})
export class ListExperienceProgramPage implements OnInit {
  param:any;
  registrationId: any;
  profile=[];
  arr_bulan = new Array("Januari","Februari","Maret","April", "Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
  arrList:any;
  isShow: boolean=false;

  constructor(
    public api: HelperService,
    private router: Router,
    private routerOutlet: IonRouterOutlet
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

  goPromotion() { 
    this.router.navigate(['/list-experience-promotion']);
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
    this.api.getNewApi('culinaria/events',this.param).then(data => 
    {
      const arr: any = data;
      this.arrList = arr;
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
