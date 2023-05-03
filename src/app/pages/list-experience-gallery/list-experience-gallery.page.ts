import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-list-experience-gallery',
  templateUrl: './list-experience-gallery.page.html',
  styleUrls: ['./list-experience-gallery.page.scss'],
})
export class ListExperienceGalleryPage implements OnInit {
  param:any;
  registrationId: any;
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

  goProgram() { 
    this.router.navigate(['/list-experience-program']);
  }

  load_pertama(){
    this.param = {
      params: {},
      headers: { 'Security-Code': this.api.security_code}
    };
    this.api.getNewApi('culinaria/galleries',this.param).then(data => 
    {
      const arr: any = data;
      this.arrList = arr;
    });
  }

}
