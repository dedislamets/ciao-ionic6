import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  input = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    phone:''
  }
  public param:any;
  public arr_token: any;
  language:any;
  label_error_password_tidak_sama: string = "";
  label_error_isikan_password: string = "";
  label_error_isian_ulang_password: string = "";
  label_isikan_email_anda:string = "";
  registrationId: any;
  label_register_new:string = "";
  label_register:string = "";
  label_have_account:string = "";
  error_isian_kosong:string = "";
  error_email:string = "";
  label_username:string = "";
  label_email:string = "";
  label_confirm:string = "";
  label_phone:string = "";
  label_isikan_phone_anda:string = "";
  readonly:boolean= true;
  public isValid:boolean = true;

  constructor(
    private storage: StorageService,
    private router: Router,
    public api: HelperService,
    private toastCtrl: ToastController
  ) {
    this.storage.get('registrationId').then(data => {
      this.registrationId = data;
    });
    // this.getInfoHP();
   }

  ngOnInit() {
    this.loadLang();
  }

  register(){
    this.router.navigate(['/register'])
  }

  public login()
  {
    this.router.navigate(['/login'])
  }

  // public register()
  // {
  //   this.input.username = '';
  //   this.input.email = '';
  //   this.input.password = '';
  //   this.input.confirm = '';
  //   this.input.phone = '';
  // }

  loadLang(){
    this.api.getBahasa().then(result => 
    {
      const lang: any = result;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        this.label_error_password_tidak_sama= lang['id'].login.label_error_password_tidak_sama;
        this.label_error_isikan_password = lang['id'].login.label_error_isikan_password;
        this.label_error_isian_ulang_password = lang['id'].login.label_error_isian_ulang_password;
        this.label_isikan_email_anda = lang['id'].login.label_isikan_email_anda;
        this.label_isikan_phone_anda = lang['id'].login.label_isikan_phone_anda;
        this.label_register_new = lang['id'].login.label_register_new;
        this.label_have_account = lang['id'].login.label_have_account;
        this.label_register = lang['id'].login.label_register;
        this.error_isian_kosong = lang['id'].login.error_isian_kosong;
        this.error_email = lang['id'].login.error_email;
        this.label_username = lang['id'].login.username;
        this.label_email = lang['id'].login.email;
        this.label_confirm = lang['id'].login.confirm_pass;
        this.label_phone = lang['id'].login.phone;
      }else{
        this.api.showAlert(JSON.stringify(lang['error']));
      }
    });
  }

  async validateForm() {
    this.isValid = true;
    if(this.input.username.length == 0 || this.input.username.replace(/\s+/g, '') == "") {
      const toast = await this.toastCtrl.create({
        message: this.error_isian_kosong,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.isValid = false;

    }else if(this.input.email.length == 0 || this.input.email.replace(/\s+/g, '') == "" ){
      const toast = await this.toastCtrl.create({
        message: this.label_isikan_email_anda,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.isValid = false;
    }else if(this.input.phone.length < 10 ){
      const toast = await this.toastCtrl.create({
        message: this.label_isikan_phone_anda,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.isValid = false;
    }else if(!this.ValidateEmail(this.input.email.replace(/\s+/g, ''))){
      const toast = await this.toastCtrl.create({
        message: this.error_email,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.isValid = false;

    }else if(this.input.password.length == 0 || this.input.password.replace(/\s+/g, '') == "" ){
      const toast = await this.toastCtrl.create({
        message: this.label_error_isikan_password,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.isValid = false;
    }else if(this.input.confirm.length == 0 || this.input.confirm.replace(/\s+/g, '') == ""){
      const toast = await this.toastCtrl.create({
        message: this.label_error_isian_ulang_password,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.isValid = false;
    }else if(this.input.password !== this.input.confirm){
      const toast = await this.toastCtrl.create({
        message: this.label_error_password_tidak_sama,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.isValid = false;
    }
  }

  async ValidateEmail(mail: string) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.match(mailformat)){
      return true;
    }else{
      return false;
    }
  }

  public registrasi(){
    this.validateForm();
    if(this.isValid){
        this.param = {
            params: {
            ws: 'register_dev',
            e: this.input.email,
            p: this.input.password,
            hp: this.input.phone,
            nama: this.input.username
            }
        };

        this.api.getApi(this.param).then(result => 
        {
          const data:any = result;
            if(data['error'] == undefined) {
                if(data[0].status=='duplikasi'){
                  this.api.showAlert(data[0].pesan);
                }else{
                  // this.ceklogin();
                  this.api.showAlertString(data[0]["pesan"]);
                  this.login();
                }
                
            }else{
                this.api.showAlert(JSON.stringify(data['error']));
            }
        });
    }
  }
}
