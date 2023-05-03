import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.page.html',
  styleUrls: ['./profile-form.page.scss'],
})
export class ProfileFormPage implements OnInit {

  language:any;
  profile:any = [];
  param:any;
  konsumen_id:any;
  provinsi:any;
  telepon:string = "";
  hp:string="";
  kota:any;
  kode_pos:string = "";
  alamat_current:string = "";
  arr_provinsi:any;
  arr_kota:any;
  label_lokasi_produk:string = "";
  label_propinsi:string = "";
  label_kota:string = "";
  label_kode_pos:string = "";
  label_telepon: string = "";
  label_telepon_selular:string = "";
  nama: string ='';
  email: string = '';
  label_nama:string = "";
  judul_konfirmasi:string = "";
  judul_notifikasi:string = "";
  label_alamat:string = "";
  notif_simpan_perubahan_data:string = "";
  label_kosongkan_apabila_tidak_ada_perubahan:string = "";
  label_ubah_password:string = "";
  label_ulangi_ketikkan_password:string = "";
  ubah:boolean =false;
  error_password_beda: boolean = false;
  flag_tutup:boolean = false;
  password:string = "";
  repeat_password:string = "";
  label_error_password_beda:string = "";
  error_email:string = "";
  readonly: boolean = true;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private api: HelperService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private events: EventService
  ) { }

  ngOnInit() {
    this.storage.get('login').then(result => {
      if (result != null) {
        this.profile = result;
        this.konsumen_id = result['konsumen_id'];
        this.load_profil_pengguna(result);
        this.loadLang();
      }
    })

  }

  async showPrompt(arr_hp:any) {
    const prompt = await this.alertCtrl.create({
      message: "Pilih No Hp yang akan di daftarkan",
      cssClass: 'alert-phone',
      buttons: [
        {
          text: 'Batal',
          handler: (data:any) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Pilih',
          handler: (data:any) => {
            this.hp=data;
          }
        }
      ]
    });
    // for(let i = 0; i < arr_hp.length; i++) {
    //   prompt.addInput({
    //     type: 'radio',
    //     label: arr_hp[i]['phoneNumber'],
    //     value: arr_hp[i]['phoneNumber'],
    //   })
    // }
    prompt.present();
  }
  load_profil_pengguna(getData:any){
    this.param = {
      params: {
        ws: 'memberprofil',
        memberid: this.konsumen_id,
      }
    };
    this.api.getApi(this.param).then(res => 
    {
      const data_profile:any = res;
      this.profile = data_profile[0];
      this.alamat_current = data_profile[0]['address'];
      this.telepon = data_profile[0]['phone'];
      this.hp = data_profile[0]['handphone'];
      this.nama = data_profile[0]['name'];
      this.kode_pos = data_profile[0]['homepostcode'];
      
      this.email = data_profile[0]['email'];
      this.load_provinsi();
      this.load_kota(data_profile[0]['region_id']);
      setTimeout(() => {
        this.provinsi = data_profile[0]['state_id'];
      }, 1000);
      if(this.hp=="" || this.hp==undefined){
        // this.getInfoHP();
        // this.readonly = false;
      }
    });
  }

  ubah_password(){
    
    if( this.password.trim() != "" ) {
      this.ubah = true;
      if(this.password != this.repeat_password){
        this.error_password_beda = true;
      }else{
        this.error_password_beda = false;
      }
    }else{
      this.ubah = false;
    }
  }
 
  load_provinsi(){
    this.param = {
      params: {
        ws: 'propinsi',
      }
    };

    this.api.getApi(this.param).then(data => 
    {
      this.arr_provinsi= data;
    });
  }
  load_kota(ref= ""){
    this.param = {
      params: {
        ws: 'kota',
        propinsi_id: this.provinsi
      }
    };

    this.api.getApi(this.param).then(res => 
    {
      const data:any = res;
      this.arr_kota= data;
      this.kota = (ref != "" ? ref : data[0]['kota_id']) ;
    });
  }
  onChangePropinsi(p:any){
    this.load_kota();
  }
  loadLang(){
   
    this.api.getBahasa().then(res => 
    {
      const lang:any = res;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        //this.judul = lang['id'].permintaan_servis.judul;
        this.judul_notifikasi = lang['id'].umum.judul_notifikasi;
        this.label_alamat = lang['id'].profil_pengguna.label_alamat;
        this.label_propinsi = lang['id'].registrasi_kontrak_servis.label_propinsi;
        this.label_kota = lang['id'].registrasi_kontrak_servis.label_kota;
        this.label_kode_pos = lang['id'].registrasi_kontrak_servis.label_kode_pos;
        this.label_telepon = lang['id'].registrasi_kontrak_servis.label_telepon;
        this.label_telepon_selular = lang['id'].registrasi_kontrak_servis.label_telepon_selular;
        this.notif_simpan_perubahan_data = lang['id'].profil_pengguna.notif_simpan_perubahan_data;
        this.judul_konfirmasi = lang['id'].umum.judul_konfirmasi;
        this.label_nama = lang['id'].profil_pengguna.label_nama;
        this.label_ubah_password = lang['id'].profil_pengguna.label_ubah_password;
        this.label_ulangi_ketikkan_password = lang['id'].profil_pengguna.label_ulangi_ketikkan_password;
        this.label_error_password_beda = lang['id'].profil_pengguna.label_password_tidak_sesuai;
        this.error_email = lang['id'].login.error_email;
        this.label_kosongkan_apabila_tidak_ada_perubahan = lang['id'].profil_pengguna.label_kosongkan_apabila_tidak_ada_perubahan;
      }else{
        this.api.showAlert(JSON.stringify(lang['error']));
      }
    });
  }

  showHide() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  validator(){
    var text ='';
    
    try {
      if(this.alamat_current==''){
        text += this.label_alamat + ' Fill Required..<br>';
      }
      if(this.telepon==''){
        text += this.label_telepon + ' Fill Required..<br>';
      }
      if(this.hp=='' || this.hp== "null"){
        text += this.label_telepon_selular + ' Fill Required..<br>';
      }
      if(this.konsumen_id==''){
        text += 'Konsumen ID Fill Required..<br>';
      }
      if(this.nama ==''){
        text += this.label_kota + ' Fill Required..<br>';
      }
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!this.email.trim().match(mailformat)){
        text += this.error_email + ' <br>';
      }

      if(this.error_password_beda){
        text += this.label_ubah_password + ' Not Match Field..<br>';
      }
      
      if(text != ''){
        this.api.showNotify(text,this.judul_notifikasi);
      }else{
        this.cek_duplikat_hp();
      }

      
    } catch (error:any) {
      this.api.showAlert(error);
    }
  }

  cek_duplikat_hp(){
    this.param = {
      params: {
        ws: 'register',
        memberid: this.konsumen_id,
        c: "cek_phone_information",
        hp: this.hp
      }
    };

    this.api.getApi(this.param).then(res => 
    {
        const data:any = res;
        if(data['error'] == undefined) {
            if(data[0].status=='duplikasi'){
              this.api.showAlert(data[0].pesan);
            }else{
              this.showConfirm();
            }
            
        }else{
            this.api.showAlert(JSON.stringify(data['error']));
        }
    });
  }

  async showConfirm() {
    
    this.param = {
      params: {
        ws: 'memberprofil',
        lg: 'id',
        c: 'simpan',
        txt_nama: this.nama,
        txt_alamat: this.alamat_current,
        s_kota: this.kota,
        s_propinsi: this.provinsi,
        txt_kodepos: this.kode_pos,
        txt_telepon: this.telepon,
        txt_telepon_selular: this.hp,
        memberid: this.konsumen_id,
        password: (this.ubah ? this.password : '' ),
        email: this.email
      }
    };

    const confirm = await this.alertCtrl.create({
      header: this.notif_simpan_perubahan_data,
      subHeader: this.judul_konfirmasi,
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              message: "Waiting...",
            });
            this.api.getApi(this.param).then(res => 
            {
              const data:any = res;
              if(data['error'] == undefined) {
                loader.dismiss();
                this.api.showNotify(data['status'],this.judul_notifikasi);
                this.events.publishSomeData({
                  refresh_profile: true
                });
              }else{
                loader.dismiss();
                this.api.showNotify(data['error'],'Error');
              }
            });
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
