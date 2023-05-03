import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonRouterOutlet, LoadingController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-garansi',
  templateUrl: './list-garansi.page.html',
  styleUrls: ['./list-garansi.page.scss'],
})
export class ListGaransiPage implements OnInit {

  profile:any;
  isShow: boolean=false;
  public param:any;
  arrList:any;
  arr_bulan = new Array("Januari","Februari","Maret","April", "Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
  language:any;
  template_pembelian_dari:string = "";
  template_nomor_seri:string = "";
  judul:string = "";
  daftar_produk:string = "";
  status_verifikasi:string = "";
  values_produk_note:Array<string> = [];
  jml_verifikasi:number=0;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private storage: StorageService,
    private api: HelperService,
    private router: Router,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private location: Location
  ) { 
    this.loadLang();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    setTimeout(() => {
      this.storage.get('login').then(result => {
        if (result != null) {
            this.profile = result;
            this.getData();
        }else{
          this.router.navigate(['/login'])
        }
      })
    }, 1000);
  }

  loadLang(){
    this.api.getBahasa().then(data => 
    {
      const lang: any = data;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        this.template_pembelian_dari = lang['id'].index.template_pembelian_dari;
        this.template_nomor_seri = lang['id'].index.template_nomor_seri;
        this.judul = lang['id'].mulai_registrasi_garansi.tambah_produk;
        this.daftar_produk = lang['id'].mulai_registrasi_garansi.daftar_produk;
        this.status_verifikasi = lang['id'].mulai_registrasi_garansi.status_verifikasi;
      }else{
        if(lang['error']['isTrusted']){
          this.api.showAlertString(lang['error']);
        }
        
      }
    });
  }

  async getData() {
    const loader = await this.loadingCtrl.create({
      message: "Please wait...",
    });
    loader.present();
    this.param = {
      params: {
      ws: 'memberproduk',
      memberid: this.profile['konsumen_id'],
      }
    };
    this.api.getApi(this.param).then(data =>
    {
      const arr:any = data;
      if(arr['error'] == undefined) {
        this.isShow= false;
        this.arrList = data;
        for(var k = 0; k < this.arrList.length; k++){
          this.arrList[k]['tanggal'] = this.api.format_tanggal( this.arrList[k]['purchasedate'], this.arr_bulan );
          this.load_memberproduk(this.arrList[k],k);
          if(this.arrList[k]['status_verifikasi'] == 2){
            this.jml_verifikasi = this.jml_verifikasi + 1;
          }
          this.isShow= true;
        }
        
        loader.dismiss();
      }else{
          this.api.showAlert(arr['error']);
          loader.dismiss();
      }
    });
  }

  load_memberproduk(data_member:any,index:number){
    if( typeof data_member.data_kontrak_servis !== "undefined" ){
      this.values_produk_note[index] = "Kontrak servis AKTIF No. " + data_member.data_kontrak_servis[0].nomor_kks
      // update data nomor kontrak servis di website modena
      this.update_data_kontrak_servis( data_member.serialnumber, data_member.data_kontrak_servis[0].nomor_kks );
      //produk_note += "<br />Berlaku : " + format_tanggal( data_member.data_kontrak_servis[0].date_from_formatted, arr_bulan ) + " - " + format_tanggal( data_member.data_kontrak_servis[0].date_to_formatted, arr_bulan )
      //produk_note += "<br />Waktu kunjungan terdekat : " + format_tanggal( data_member.data_kontrak_servis[0].tanggal_jadwal_formatted, arr_bulan )
    }else{
      if( data_member.kontrak_servis_registrasi == 1 ){
        this.values_produk_note[index] = "Registrasi kontrak servis menunggu verifikasi.";
      }else{
        this.values_produk_note[index]='';
      }
    }
    if( typeof data_member.data_servis_request !== "undefined" ){
      this.values_produk_note[index] += ( this.values_produk_note[index].trim().length > 0 ? "<br />" : "" ) + "Permintaan servis No. " + data_member.data_servis_request.nomor_ron
    }
  }

  update_data_kontrak_servis(p_sn: string, p_ksn: string){
    this.param = {
      params: {
        ws: 'memberproduk',
        c: 'update_data_kontrak_servis',
        memberid: this.profile['konsumen_id'],
        sn: p_sn,
        ksn: p_ksn
      }
    };
    this.api.getApi(this.param).then(data =>
    {

    });
  }

  create(){
    this.router.navigate(['/garansi-form',{
      jml_verifikasi : this.jml_verifikasi,
    }], { skipLocationChange: true });
  }

  itemSelected(itm:any){
    this.router.navigate(['/garansi-detail',{
      item: JSON.stringify(itm),
      konsumen_id: this.profile['konsumen_id'],
      c: '',
      profile: JSON.stringify(this.profile)
    }])
  }

  goBack() { 
    this.router.navigate(['/home']);
  }

}
