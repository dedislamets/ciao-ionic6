import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public param:any;
  label_lupa_password:string = "";
  language:any;
  label_mohon_masukkan_email: string = "";
  email:string = "";
  constructor(
    private api:HelperService,
    private router: Router
  ) { }

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
    if(this.email.trim()==""){
      alert('Email tidak boleh kosong');
    }else{
      this.param = {
        params: {
          ws: 'register',
          c: 'reset_password_pin',
          e: this.email,
        }
      };
      this.api.getApi(this.param).then(res => 
      {
        const data:any = res;
        if(data['length'] > 0) {
          if(data[0]['status'] == "ok"){
            // this.navCtrl.push(PinPasswordPage,{
            //   data: this,
            //   pin: data[0]['pin'],
            // });

            this.router.navigate(['/pinpassword',{
              email: this.email,
              pin: data[0]['pin'],
            }])
          }else{
            this.api.showAlertString(data[0]["pesan"]);
          }
          
        }else{
          this.api.showAlertString(data['error']);
        }
      });
    }
  }
}
