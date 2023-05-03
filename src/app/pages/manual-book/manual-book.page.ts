import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-manual-book',
  templateUrl: './manual-book.page.html',
  styleUrls: ['./manual-book.page.scss'],
})
export class ManualBookPage implements OnInit {

  produk: any;
  public param:any;
  items: any;
  label_dokumen_manual_pengguna: string = "";
  label_mohon_isikan_alamat:string = "";
  judul_notifikasi: string = "";
  input_lihat:string = "";
  notif_mohon_pilih_manual:string = "";
  input_b_email:string = "";
  email:string = "";
  language:any;
  show:boolean = false;
  jumlah_manual: number =0;
  values:Array<string> = [];

  constructor(
    private api: HelperService,
    private iab: InAppBrowser,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.produk = this.navParams.get("content").product;
    this.loadLang();
    this.load_manualfile();
  }

  loadLang(){
    
    this.api.getBahasa().then(res => 
    {
      const lang:any = res;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.label_dokumen_manual_pengguna = lang['id'].index.label_dokumen_manual_pengguna;
        this.label_mohon_isikan_alamat = lang['id'].index.label_mohon_isikan_alamat;
        this.input_lihat = lang['id'].index.input_lihat;
        this.input_b_email = lang['id'].index.input_b_email;
        this.judul_notifikasi = lang['id'].umum.judul_notifikasi;
        this.notif_mohon_pilih_manual = lang['id'].index.notif_mohon_pilih_manual;
      }else{
        this.api.showAlert(JSON.stringify(lang['error']));
      }
    });
    
  }
  load_manualfile(){
    this.param = {
      params: {
        ws: 'manualfile',
        p: this.produk
      }
    };
    this.api.getApi(this.param).then(res => 
    {
      const data:any = res;
      this.items = data;
      this.jumlah_manual = this.items.length;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  klik_kirim_email(e:any){
    this.show = false;
    var arr_manual_terpilih = new Array();
    for(var k = 0; k < this.jumlah_manual; k++){
      var cb:any = document.getElementById("cb_" + k);
      if( cb['checked'] ) {
        console.log(cb['checked']);
        arr_manual_terpilih[ arr_manual_terpilih.length ] = cb['value'];
        this.show = true;
      }
    }
  }
  select(item:any){
    this.openview(item.manualfilename);
  }

  openview(filename:string){
    const option: InAppBrowserOptions = {
      hideurlbar: 'yes',
      toolbar: 'no',
      hardwareback: 'yes',
      useWideViewPort: 'yes',
      location: 'no',
      hidenavigationbuttons: 'yes'
    }
    const browser = this.iab.create('http://docs.google.com/viewer?url=https://www.modena.co.id/manual/'+filename,'_blank', option);
  }

  kirim_email(){
    var valid= false;
    for(var k = 0; k < this.jumlah_manual; k++){
      var cb:any = document.getElementById("cb_" + k);
      if( cb['checked'] ) {
        valid=true;
      }
    }
    if(!valid) {
      this.api.showNotify(this.notif_mohon_pilih_manual,this.judul_notifikasi);
      return ;
    }
    if( this.email == undefined ){
      this.api.showNotify(this.label_mohon_isikan_alamat,this.judul_notifikasi);
      return ;
    }

    this.param = {
      params: {
        ws: 'manualfile',
        p: this.produk,
        c: 'kirim_email',
        jumlah_manual:this.jumlah_manual,
        email: this.email,
        product: this.produk
      }
    };
    for(var k = 0; k < this.jumlah_manual; k++){
      var cb:any = document.getElementById("cb_" + k);
      if( cb['checked'] ) {
        this.param['params']['cb_' + k] = cb['value'];
      }
    }
    this.api.getApi(this.param).then(res => 
    {
      const data:any = res;
      this.api.showNotify(data['notifikasi'],this.judul_notifikasi);
      this.modalCtrl.dismiss();
    });
  }
}
