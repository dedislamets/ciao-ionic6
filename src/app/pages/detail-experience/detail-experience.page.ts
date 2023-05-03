import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-experience',
  templateUrl: './detail-experience.page.html',
  styleUrls: ['./detail-experience.page.scss'],
})
export class DetailExperiencePage implements OnInit {

  param:any;
  language:any;
  arrList:any=[];
  arrList_detail:any=[];
  tabs: string = 'chef';

  constructor(
    private routerOutlet: IonRouterOutlet,
    public api: HelperService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => {
        this.getDataEvent(params['id']) 
        
      });
    }

  ngOnInit() {
  }

  getDataEvent(id: number){
    this.param = {
      params: {
        orders: 'created_at:desc'
      },
      headers: { 'Security-Code': this.api.security_code}
    };
    this.api.getNewApi('culinaria/event-detail/'+ id,this.param).then(data => 
    {
      this.arrList = data;
      this.arrList['class_date'] = moment(this.arrList['class_date']).format("MMM DD, YYYY");
    });
  }

  goBack() { this.router.navigate(['/list-experience']); }

  goChef() { 
    this.tabs= 'chef';
  }

  goAbout() { 
    this.tabs= 'about';
  }

  goDate() { 
    this.tabs= 'date';
  }

  goCourse() { 
    this.tabs= 'course';
  }
}
