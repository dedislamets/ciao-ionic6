import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { HelperService } from '../../services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  input = {
    email: '',
    password: ''
  }
  maxlogin: number = 0;
  public param:any;
  public arr_token: any;
  devid:any = 'cdpqvof4zW4:APA91bHD-UaJl0di4d7lAUfjHnNuiArLhn5Zt53IlU7Ilv30eoN2TKXWqRG2wmfZyESEDzTtw2rF164BnyCFXaZr5G-H-vmNMS-0mJLB4MlTIWn8XVlNhx__dwWpB6QmKgMpb3SBtP5h';
  permitchange:string = '';
  loginForm: any = FormGroup;
  loginError: string = "";
  registrationId: any;
  label_register_new:string = "";
  label_have_account:string = "";
  label_lupa_password:string = "";
  label_click_here:string = "";
  language:any;
  label_email:string = "";
  label_klik_disini:string = "";
  masuk_dengan:string = "";
  judul:string = "";

  constructor(
    public api: HelperService,
    private storage: StorageService,
    private router: Router,
    private toastCtrl: ToastController,
    private fbi: FormBuilder,
    private auth: AuthService,
    public ngFireAuth: AngularFireAuth
  ) { 
    this.loginForm = fbi.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});

    ngFireAuth.onAuthStateChanged( user => {
      if (user){
        this.router.navigate(['/home']);
      } 
    });

    this.storage.get('registrationId').then(data => {
      this.registrationId = data;
    });
  }

  ngOnInit() {
    this.loadLang();
    this.storage.get('deviceid').then(dev => {
      this.devid = dev;
    });
    setTimeout(() => {
      this.storage.get('login').then(result => {
        if (result != null) {
          this.router.navigate(['/home']);
        }
      })
    }, 1000);
  }

  google(){
    this.auth.googlePlusLogin().then(
      (results) =>{
        this.api.showAlert(results);
        const response:any = results;
        this.param = {
          params: {
            ws: 'parsing_login',
            e: response["user"]["providerData"][0].email,
            nama: response["user"]["providerData"][0].displayName,
            hp: response["user"]["providerData"][0].phoneNumber,
            fbid:''
          }
        };

        this.api.getApi(this.param).then(res => 
        {
          const data:any = res;
            // this.api.setmemory('prof',data[0]);
            this.storage.set('login',data[0]);
            this.cek_langganan_push(response["user"]["providerData"][0].email);
        });
        
      }).catch((error) => {
        alert(error);
      })
  }

  facebook(){
    this.auth.facebookLogin().then(
      (results) =>{
        const response:any = results;
        this.param = {
          params: {
            ws: 'parsing_login',
            e: typeof response["user"]["providerData"][0].email == 'undefined' || response["user"]["providerData"][0].email == null || response["user"]["providerData"][0].email == '' ? response["user"]["providerData"][0].uid : response["user"]["providerData"][0].email ,
            nama: response["user"]["providerData"][0].displayName,
            hp: response["user"]["providerData"][0].phoneNumber,
            fbid: response["user"]["providerData"][0].uid
          }
        };
        // this.api.showAlert(JSON.stringify(this.param));

        this.api.getApi(this.param).then(res => 
        {
          // this.api.showAlert(JSON.stringify(data));
            const data:any = res;
            // this.api.setmemory('prof',data[0]);
            this.storage.set('login',data[0]);
            this.cek_langganan_push(response["user"]["providerData"][0].email);
        });
      }).catch((error) => {
        // alert(error);
      })
  }

  register(){
    this.router.navigate(['/register']);
  }

  async loginapp (){
    let valid = this.validateForm();
    if(!valid){
      const toast = await this.toastCtrl.create({
        message: 'Email/Password tidak boleh kosong.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }else{
      this.ceklogin();
    }
  }

  validateForm() {
    if (this.input.email.length == 0 || this.input.password.length == 0 || this.input.email.trim()=='' || this.input.password.trim()=='') {
      return false;
    } else {
      return true;
    }
  }

  public ceklogin(){
    this.param = {
        params: {
        ws: 'login_dev',
        e: this.input.email,
        p: this.input.password,
      }
    };

    this.api.getApi(this.param).then(datas => 
    {
        const data:any = datas;
        if(data['error'] == undefined && data["length"] > 0) {
            // this.api.setmemory('prof',data[0]);
            setTimeout(() => {
              this.storage.set('login',data[0]);
              this.cek_langganan_push(this.input.email);
            }, 1000);
        }else{
            this.api.showAlertString(JSON.stringify(data['error']));
        }
    });
  }

  public cek_langganan_push(email:string){
    this.param = {
      params: {
        ws: 'push_subscription',
        apps:'ciaomodena',
        mode:"cek",
        registrasionid: this.registrationId,
        email: email
      }
    };
    this.api.getApi(this.param).then(msgs => 
    {
      const msg:any = msgs;
      if( msg['langganan_id'] == "" ){
        this.langganan_push(email);
      }else{
        this.router.navigate(['/home']);
        // .then(() => {
        //   window.location.reload();
        // });
      }
    });
  }

  public langganan_push(email:string){
    this.param = {
      params: {
        ws: 'push_subscription',
        apps:'ciaomodena',
        registrasionid: this.registrationId,
        email: email
      }
    };
    this.api.getApi(this.param).then(msg => 
    {
      this.router.navigate(['/home']);
    });
  }

  lupa_password(){
    this.router.navigate(['/forgot-password']);
  }

  loadLang(){
    this.api.getBahasa().then(data => 
    {
      const lang: any = data 
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        this.label_register_new = lang['id'].login.label_register_new;
        this.label_have_account = lang['id'].login.label_have_account;
        this.label_lupa_password = lang['id'].login.label_lupa_password_kecil;
        this.label_click_here = lang['id'].login.label_click_here;
        this.label_email = lang['id'].login.email_phone;
        this.label_click_here = lang['id'].login.klik_disini;
        this.masuk_dengan = lang['id'].login.masuk_dengan;
        this.judul = lang['id'].login.judul;
      }else{
        this.api.showAlert(JSON.stringify(lang['error']));
      }
    });
  }
}
