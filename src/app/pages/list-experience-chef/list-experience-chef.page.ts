import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-list-experience-chef',
  templateUrl: './list-experience-chef.page.html',
  styleUrls: ['./list-experience-chef.page.scss'],
})
export class ListExperienceChefPage implements OnInit {
  param:any;
  arrList:any;

  constructor(
    public api: HelperService,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
    private alertCtrl: AlertController
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
      params: {},
      headers: { 'Security-Code': this.api.security_code}
    };
    this.api.getNewApi('culinaria/chefs',this.param).then(data => 
    {
      const arr: any = data;
      this.arrList = arr;
    });
  }

  async detailChef(itm: any){
    const alert = await this.alertCtrl.create({
      header: itm.chef_name,
      buttons: ['OK'],
      message: `<img src="${itm.media}" class="card-alert"><p>${itm.description_chef}</p>`
    });

    await alert.present();
  }

}
