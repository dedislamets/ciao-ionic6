import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-password-baru',
  templateUrl: './password-baru.page.html',
  styleUrls: ['./password-baru.page.scss'],
})
export class PasswordBaruPage implements OnInit {
  pass1:any;
  pass2:any;
  param:any;
  MemberID:any;
  params:any;

  constructor(
    private api:HelperService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService
  ) { 
    this.route.params.subscribe(params => {
      this.params = params; 
    });
  }

  ngOnInit() {
  }
  submit(){
    if(this.pass1 == this.pass2){
      this.param = {
        params: {
          ws: 'register',
          c: 'upp',
          e: this.params["email"],
          nps: this.pass1,
        }
      };

      this.api.getApi(this.param).then(res => 
      {
        const data:any = res;
        setTimeout(() => {
          this.storage.set('login',data[0]['data'][0]);
          this.router.navigate(['/home'])
        }, 1000);
      })
    }else{
      this.api.showAlertString("Password tidak cocok !");
    }
  }
}
