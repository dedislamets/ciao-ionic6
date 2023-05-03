import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { ManualBookPage } from '../manual-book/manual-book.page';

@Component({
  selector: 'app-garansi-detail',
  templateUrl: './garansi-detail.page.html',
  styleUrls: ['./garansi-detail.page.scss'],
})
export class GaransiDetailPage implements OnInit {

  konsumen_id: any;
  product_id:any;
  param:any;
  arr_tanggal:any;
  nama_produk:String = "";
  product:string = "";
  nomorseri:string = "";
  purchaseat:string = "";
  text_status_garansi:string = "";
  tanggal_pembelian:string = "";
  input_b_download:string = "";
  input_b_permintaan_servis:string = "";
  input_b_kontrak_servis:string = "";
  kontainer_info_kontrak_servis_tanggal_registrasi:string = "";
  img_produk:string = "";
  valid:string = "";
  action: string = "";
  profile:any;
  language:any;
  kontrak_servis_registrasi:any;
  kontainer_info_kontrak_servis_nomor:string = "";
  kontainer_info_kontrak_servis_status_registrasi:string = "";
  kontainer_info_kontrak_servis_masa_berlaku:string = "";
  kontainer_info_kontrak_servis_jadwal_kunjungan:string = "";
  label_tanggal_registrasi:string = "";
  label_kontrak_servis:string = "";
  label_nomor :string = "";
  label_masa_berlaku:string = "";
  label_jadwal_kunjungan:string = "";
  label_jadwal_kunjungan_terdekat:string = "";
  tabel_info_registrasi_kontrak_servis:boolean = false;
  tabel_info_kontrak_servis:boolean = false;
  spot_light_ada:boolean = false;
  arr_history:any;
  items:any;
  sURL = new Array();
  listVideo:any = [];
  arr_bulan = new Array("Januari","Februari","Maret","April", "Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");


  constructor(
    private routerOutlet: IonRouterOutlet,
    public api: HelperService,
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router,
    private modalCtrl: ModalController
  ) { 
    this.route.params.subscribe(params => {
      this.konsumen_id = params["konsumen_id"];
      this.profile = JSON.parse(params["profile"]);
      this.product_id = JSON.parse(params["item"]).membersproductid;
      this.action = params['c'];
      this.items = JSON.parse(params["item"])
    });
    
    
    this.sURL[0] = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=5&playlistId=PLURGZCKR6IhntTWh51X5Z3LoVpS2S4cBJ&key=AIzaSyD-P-LYczIg4nOQyHZqWYxC2cEs5sQjibI";
    this.sURL[1] = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=5&playlistId=PLURGZCKR6IhlFpmeWlJRQSECh8l-tVy-K&key=AIzaSyD-P-LYczIg4nOQyHZqWYxC2cEs5sQjibI";

    
    this.img_produk = './assets/images/img-not-found.jpg';
  }

  ngOnInit() {
    this.loadLang();
    this.load_awal_index_detail();
  }

  loadLang(){
    this.api.getBahasa().then(result => 
      {       
        const lang:any = result;
        if(lang['error'] == undefined) {
          this.language = JSON.stringify(lang);
          this.language = lang;
          this.input_b_download = lang['id'].index.input_b_download;
          this.input_b_permintaan_servis = lang['id'].index.input_b_permintaan_servis;
          this.input_b_kontrak_servis = lang['id'].index.input_b_kontrak_servis;
          this.label_kontrak_servis = lang['id'].index.label_kontrak_servis;
          this.label_tanggal_registrasi = lang['id'].index.label_tanggal_registrasi;
          this.label_nomor = lang['id'].index.label_nomor;
          this.label_masa_berlaku = lang['id'].index.label_masa_berlaku;
          this.label_jadwal_kunjungan = lang['id'].index.label_jadwal_kunjungan;
          this.label_jadwal_kunjungan_terdekat = lang['id'].index.label_jadwal_kunjungan_terdekat;
          this.kontainer_info_kontrak_servis_status_registrasi = lang['id'].index.kontainer_info_kontrak_servis_status_registrasi;
        }else{
          this.api.showAlert(JSON.stringify(lang['error']));
        }
      });
  }

  load_awal_index_detail(){
    if(this.action == 'muat_video'){

    }else{
      this.load_profil_produk( this.konsumen_id, this.product_id );
      this.load_riwayat_produk(this.product_id);
    }
  }

  goBack() { 
    this.router.navigate(['/list-garansi']);
  }

  load_profil_produk(kid: number,id:number){
    let arrid = new Array(id);
    this.param = {
      params: {
        ws: 'memberproduk',
        memberid: kid,
        membersproductid: arrid,
        c:''
      }
    };

    this.api.getApi(this.param).then(result => 
    {
      const data:any = result;
      this.arr_tanggal = data[0].purchasedate.split("-");
      this.nama_produk = typeof data[0].nama_produk == "undefined" ? data[0].product : data[0].nama_produk;
      this.product =  data[0].product;
      this.nomorseri =  data[0].serialnumber;
      this.purchaseat = data[0].purchaseat.split("|").length>1 ? data[0].purchaseat.split("|")[1] : data[0].purchaseat;
      this.tanggal_pembelian = this.arr_tanggal[2] + " " + this.arr_bulan[ parseInt( this.arr_tanggal[1] ) - 1 ] + " " + this.arr_tanggal[0];
      this.cek_data_garansi(this.nomorseri);
      // this.load_data_kontrak_servis(data);
      this.cek_produk_code(data[0].serialnumber);

    });
  }

  load_riwayat_produk(pid:number){
    this.param = {
      params: {
        ws: 'riwayat_memberproduk',
        l: 'id',
        membersproductid: pid,
      }
    };

    this.api.getApi(this.param).then(result => 
    {
      const data:any = result;
      this.arr_history = data;
      for(var k = 0; k < this.arr_history.length; k++){
        var arr_tanggal_waktu = data[k].tanggal_transaksi.split(" ");
        var arr_tanggal = arr_tanggal_waktu[0].split("-");
      
        this.arr_history[k]['tanggal'] = arr_tanggal[2] + " " + this.arr_bulan[ parseInt( arr_tanggal[1] ) - 1 ] + " " + arr_tanggal[0] ;
        this.arr_history[k]['jam'] = arr_tanggal_waktu[1];
        this.arr_history[k]['detail'] = data[k].detail_mode.split('<br />').join("<div style='padding:5px'></div>");
      }
    });
  }

  cek_produk_code(serial:string){
    this.param = {
      params: {
        sn: serial,
        ws: 'cek_product',
      }
    };

    this.api.getApi(this.param).then(result => 
    {
      const data:any = result;
      if(data){
        this.param = {
          params: {},
          headers: { 'Security-Code': this.api.security_code}
        };
        this.api.getNewApi('product/'+ data['item_old'] , this.param).then(rest => 
        {
          const res:any = rest;
          if(res['status'] == 200){
            this.img_produk = res['image_url'];
          }
        });
      }
      
    });
  }


  cek_data_garansi(ps: string){
    let status_verifikasi = this.items.status_verifikasi;
    if(status_verifikasi == 2){
      this.text_status_garansi = this.language['id']['index']['label_garansi_belum_diverifikasi'];
    }else if(status_verifikasi == 1){
      this.valid='1';
      this.text_status_garansi = this.language['id']['index']['label_garansi_telah_diverifikasi'];
    }else if(status_verifikasi == 3){
      this.text_status_garansi = this.language['id']['index']['label_garansi_reject'];
    }
  }

  async download(){
    let modal = await this.modalCtrl.create({ 
      component : ManualBookPage, 
      componentProps: {
        content: this,
    }});
    modal.present();
  }

  kontrakServis(){
    // this.navCtrl.push(RegistrasiKontrakServicePage,{
    //   produk_id: this.product_id
    // });
  }

  permintaanservis(){
    // this.navCtrl.push(RegistrasiServicePage,{
    //   produk_id: this.product_id
    // });
  }
  editRegister(){
    this.router.navigate(['/garansi-form',{
      produk_id: this.product_id,
      mode: 'revisi',
      image_pernyataan: this.items.image_pernyataan,
      pdf_name: this.items.pdf_name,
      pdf_pernyataan: this.items.pdf_pernyataan,
      image_ktp: this.items.image_ktp,
      image_selfie: this.items.image_selfie,
      image_garansi: this.items.image_garansi
    }])
    // this.navCtrl.push(RegisterProdukPage,{
    //   produk_id: this.product_id,
    //   mode: 'revisi',
    //   image_pernyataan: this.navParams.get("item").image_pernyataan,
    //   pdf_name: this.navParams.get("item").pdf_name,
    //   pdf_pernyataan: this.navParams.get("item").pdf_pernyataan,
    //   image_ktp: this.navParams.get("item").image_ktp,
    //   image_selfie: this.navParams.get("item").image_selfie,
    //   image_garansi: this.navParams.get("item").image_garansi
    // });
  }
}
