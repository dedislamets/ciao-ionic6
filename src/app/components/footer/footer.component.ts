import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(public api: HelperService) { }

  ngOnInit() {}

  open_insta(){
    window.open('http://instagram.com/modenaindonesia', '_system', 'location=yes');
  }
  open_youtube(){
    window.open('http://www.youtube.com/user/MODENAIndonesia', '_system', 'location=yes');
  }
  open_twiter(){
    window.open('http://www.twitter.com/modenaindonesia', '_system', 'location=yes');
  }
  open_fb(){
    window.open('http://www.facebook.com/pages/Modena-Indonesia/178878438821055', '_system', 'location=yes');
  }
  open_linked(){
    //window.open('http://instagram.com/modenaindonesia');
  }
}
