import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-detail-promo',
  templateUrl: './detail-promo.page.html',
  styleUrls: ['./detail-promo.page.scss']
})
export class DetailPromoPage implements OnInit {

  param:any;
  language:any;
  arrList:any=[];
  arrList_detail:any=[];

  constructor(
    private routerOutlet: IonRouterOutlet,
    public api: HelperService,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.arrList = params; 
    });
  }

  ngOnInit() {
  }
  
  goBack() { this.routerOutlet.pop(); }

}
