import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-pinpassword',
  templateUrl: './pinpassword.page.html',
  styleUrls: ['./pinpassword.page.scss'],
})
export class PinpasswordPage implements OnInit {

  public param:any;
  params:any;
  label_lupa_password:string = "";
  language:any;
  label_mohon_masukkan_email: string = "";
  pin:string = "";
  MemberID:string = "";

  constructor(
    private api:HelperService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.params = params; 
    });
  }

  ngOnInit() {
    this.loadLang();
  }
  loadLang(){
    this.api.getBahasa().then(res => 
    {
      const lang:any = res;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        this.label_mohon_masukkan_email = lang['id'].login.label_mohon_masukkan_email;
        this.label_lupa_password = lang['id'].login.label_lupa_password;
      }else{
        this.api.showAlert(JSON.stringify(lang['error']));
      }
    });
  }
  resetpass(){
    console.log(this.params);
    if(this.params['pin'] == this.pin){
      this.param = {
        params: {
          ws: 'register',
          c: 'cek_pin',
          e: this.params['email'],
          pin: this.pin,
        }
      };

      this.api.getApi(this.param).then(res => 
      {
        const data:any = res;

        if(data[0]['status'] == "ok"){
          // this.navCtrl.push(PassBaruPage,{
          //   email: this.navParams.get("data")['email'],
          // });
          this.router.navigate(['/password-baru',{
            email: this.params['email'],
          }])
        }else{
          this.api.showAlertString(data[0]["pesan"]);
        }
      })
      
    }else{
      this.api.showAlertString("PIN tidak valid !");
    }
  }
}
