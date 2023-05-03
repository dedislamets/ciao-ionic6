import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, IonRouterOutlet, LoadingController, ModalController, NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicSelectableComponent, IonicSelectableModule } from 'ionic-selectable';
import { Observable, delay } from 'rxjs';
import { ProfileFormPage } from 'src/app/pages/profile-form/profile-form.page';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { ScannerPage } from '../scanner/scanner.page';
import { Location } from '@angular/common';
import { SuratPernyataanPage } from '../surat-pernyataan/surat-pernyataan.page';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-garansi-form',
  templateUrl: './garansi-form.page.html',
  styleUrls: ['./garansi-form.page.scss'],
})
export class GaransiFormPage implements OnInit {
  @ViewChild('selectComponent') selectComponent:any = IonicSelectableComponent;
  @ViewChild(IonModal) modal:any = IonModal;

  public base64Image : any =  './assets/images/img-not-found.jpg';
  public base64Image_pernyataan : any;
  
  base64Image_iframe: any;
  public base64Image_ktp: any = './assets/images/ktp.png';
  public base64Image_selfie: any = './assets/images/selfie.png';
  profile: any;
  portsSubscription: any;
  
  myForm: any;
  values:Array<string> = [];
  labels:Array<string> = [];
  valids:Array<string> = [];
  validatePar:Array<string>=[];
  public param:any;
  public homeColor : string = "";
  display: string = "";
  label_klaim_cashback_pelanggan_terhormat: string = "";
  label_klaim_cashback_silahkan_lengkapi: string = "";
  label_faktur_harus_difoto: string = "";
  label_konten_syarat_dan_ketentuan: string = "";
  label_foto_faktur: string = "";
  label_selfie: string = "";
  label_ktp: string = "";
  label_tempat_pembelian: string = "";
  label_tanggal_pembelian: string = "";
  label_tanggal_pembelian_catatan:string = "";
  label_data_pembelian:string = "";
  label_no_seri_produk : string = "";
  input_b_tambah_produk_registrasi:string = "";
  input_b_kirim_registrasi:string = "";
  label_data_klaim_cashback:string = "";
  konten_metode_klaim: any;
  label_b_sellout_produk:string = "";
  judul_notifikasi:string = "";
  label_klaim_cashback_metode_pembayaran:string = "";
  judul:string = "";
  judul_konfirmasi:string = "";
  konfirmasi_kirim_registrasi_garansi:string = "";
  tanggal:any;
  notif_mohon_lengkapi_profil_anda:string = "";
  metodeKlaim:Array<any>=[];
  arr_field_metode:Array<any>=[];
  metodeKlaim_new:any;
  arr_dealer:any;
  kontenMetodeKlaim:any;
  mk:number = 0;
  language:any;
  tempat_beli: string = "";
  tgl_beli: any;
  konsumen_id:string = "";
  tempat_beli_dealer:string = "";
  disabled:any = true;
  chk_setuju:boolean = false;
  isOn:boolean = false; 
  produk_id: string = "";
  arr_tanggal:any;
  mode:string = "";
  hp_klaim:string = "";
  kontenUploadKlaim:any;
  jml_verifikasi:number= 0 ;
  data_awal:any;
  data_akhir:any;
  id_dealer:any =[];
  list_dealer:any = [];
  min_date:string= moment().add(-30, 'days').format("YYYY-MM-DD");
  max_date:string = moment().format("YYYY-MM-DD");
  page:number = 0;
  base64Image_coba:string = "";
  pdf_name: string = '';
  url_pdf:string ='';
  fps:string = '';
  tempat_beli_tampil = '';
  f_ktp:boolean = true;
  f_garansi:boolean = true;
  f_selfie:boolean = true;
  params:any=[];

  arr_bulan = new Array("Januari","Februari","Maret","April", "Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
  data = {
    projects: [
      {
        projectName: "",
      }
    ]
  }

  constructor(
    private routerOutlet: IonRouterOutlet,
    public api: HelperService,
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private location: Location,
    private navCtrl: NavController,
    private event: EventService,
    
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.page = 2;
    this.display = 'none';
    this.konten_metode_klaim = '';
    this.myForm = this.formBuilder.group({
      projects: this.formBuilder.array([])
    })
    this.base64Image_pernyataan = './assets/images/img-not-found.jpg';

    this.route.params.subscribe((params:any) => {
      this.params = params; 
      if(params.jml_verifikasi){
        this.jml_verifikasi= parseInt(params.jml_verifikasi) + 1;
      }
      this.produk_id = params.produk_id ? params.produk_id : '';
      this.mode = params.mode ? params.mode : ""
      if(params.image_garansi && params.image_garansi !== 'undefined'){
        this.base64Image= params.image_garansi;
      }
      if(params.image_ktp && params.image_ktp !== 'undefined'){
        this.base64Image_ktp= params.image_ktp;
      }
      if(params.image_pernyataan && params.image_pernyataan !== 'undefined'){
        this.base64Image_pernyataan= params.image_pernyataan;
      }
      if(params.image_selfie && params.image_selfie !== 'undefined'){
        this.base64Image_selfie= params.image_selfie;
      }
    });

    this.loadLang();
    this.setCompanies();
    
    this.event.getObservable().subscribe((data) => {
      if(data.jenis !== undefined && data.jenis == 'base64Image'){
        this.base64Image = data.req;
      }
      if(data.jenis !== undefined && data.jenis == 'base64Image_pernyataan' ){
        this.base64Image_pernyataan = data.req;
      }
      if(data.jenis !== undefined && data.jenis == 'base64Image_ktp' ){
        this.base64Image_ktp = data.req;
      }
      if(data.base64Image_pernyataan){
        this.base64Image_pernyataan= data.base64Image_pernyataan;
      }
    });
  }

   async ngOnInit() {
    
    const loader = await this.loadingCtrl.create({
      message: "Please wait...",
    });
    loader.present();

    try {
      this.storage.get('login').then(result => {
        if (result != null) {
            this.konsumen_id = result['konsumen_id'];
            this.load_profil_pengguna();
            this.loadMetode();
            this.loadKontenUpload();

            if(this.mode == 'revisi'){
              this.load_garansi_produk();
              this.chk_setuju= true;
              this.disabled = false;
            }
        }
      })
      

      this.storage.get('master_dealer').then(result => {
        if (result != null) {
          this.arr_dealer = result.map((item:any) => {
            return {
                idcust: item.idcust,
                name: item.name,
                long_name : item.name + ' (' +  item.idcust + ')'
            }
          });
          // for(var k = 0; k < result.length; k++){
          //   this.arr_dealer[k]["long_name"] = result[k]["name"] + ' (' +  result[k]["idcust"] + ')';
          // }
          this.getCountries();
        }
      })
      loader.dismiss();
    } catch (error) {
      loader.dismiss();
    }

    
  }

  ionViewDidEnter(){
  }

  load_garansi_produk(){
    this.param = {
      params: {
        ws: 'memberproduk',
        memberid: this.konsumen_id,
        membersproductid: this.produk_id
      }
    };
    this.api.getApi(this.param).then(res => 
    {
      const data:any = res;
      this.labels[0] = (typeof data[0].nama_produk == "undefined" ? data[0].product : data[0].nama_produk);
      this.values[0] =  data[0].serialnumber;
      this.valids[0] = '1';
      this.tempat_beli = data[0].purchaseat;
      this.tempat_beli_tampil = data[0].purchaseat;

      if(data[0].purchaseat.split("|").length>1){
        let tst =this.arr_dealer;
        for(var k = 0; k < tst.length; k++){
          if(tst[k].idcust == data[0].purchaseat.split("|")[0]) {
            this.id_dealer = tst[k];
            this.tempat_beli_tampil = tst[k].name;
          }
        }
      }else{
        this.id_dealer['name'] = data[0].purchaseat;
      }
     
      // this.tempat_beli_dealer = data[0].purchaseat.split("|").length>1 ? data[0].purchaseat.split("|")[1] : data[0].purchaseat;
      this.tgl_beli = data[0].purchasedate;
      // this.base64Image = "https://www.modena.co.id/ws_ded/ws_upload_garansi.php?sc=lihat_foto&k=" + this.produk_id ;//+ "&r="+ Math.floor(1000 + Math.random() * 9000);
      // this.base64Image_ktp = "https://www.modena.co.id/ws_ded/ws_upload_garansi.php?sc=lihat_foto_ktp&k=" + this.produk_id; //+ "&r="+ Math.floor(1000 + Math.random() * 9000);
      // this.base64Image_selfie = "https://www.modena.co.id/ws_ded/ws_upload_garansi.php?sc=lihat_foto_selfie&k=" + this.produk_id ;//+ "&r="+ Math.floor(1000 + Math.random() * 9000);
      this.load_sellout_metode_klaim_terdaftar();
      
    });
  }

  load_sellout_metode_klaim_terdaftar(){
    this.param = {
      params: {
        ws: 'sellout_metode_klaim_terdaftar',
        memberid: this.konsumen_id,
        membersproductid: this.produk_id
      }
    };
    this.api.getApi(this.param).then(res => 
    {
      const data:any = res;
      this.mk = data[0]['klaim'];
      this.hp_klaim = data[0]['klaim_info'];
      this.onChangeMetode(data[0]['klaim']);
    });
  }

  loadKontenUpload(){
    delete this.param.params.sc;
    this.param['params']['c'] = 'load_upload_klaim_baru';
    this.api.getCSApi(this.param).then(result => 
    {
      const data:any = result;
      this.kontenUploadKlaim =  this.sanitizer.bypassSecurityTrustHtml(data['konten_upload']);
      console.log(this.kontenUploadKlaim);
    });
  }

   load_profil_pengguna(){
    this.param = {
      params: {
        ws: 'memberprofil',
        memberid: this.konsumen_id,
      }
    };
    this.api.getApi(this.param).then(async result => 
    {
      const data_profile:any = result;
      this.profile = data_profile[0];
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!this.profile['email'].trim().match(mailformat) || this.profile['name'].trim() == "" || this.profile['address'].trim() == "" || this.profile['handphone'].trim() == "" || this.profile['handphone'] == 'undefined'){
                  
          const confirm = await this.alertCtrl.create({
            header: this.notif_mohon_lengkapi_profil_anda,
            message: this.judul_notifikasi,
            buttons: [
              {
                text: 'OK',
                handler: async () => {
                  let modal = await this.modalCtrl.create({
                    component: ProfileFormPage
                  });
                  modal.onDidDismiss().then(() => {
                    this.ngOnInit()
                  });
                  modal.present();
                }
              },
              {
                text: 'Cancel',
                handler: () => {
                  this.router.navigate(['/home'])
                }
              }
            ]
          });
          confirm.present();
        }
    });
  }

  setCompanies() {
    let control = <FormArray>this.myForm.controls.projects;
    this.data.projects.forEach(x => {
      control.push(this.formBuilder.group({ 
        projectName: x.projectName 
      }))
    })
  }

  bukaPencarian(){
    this.selectComponent.open();
  }
  tutupPencarian(){
    this.selectComponent.close();
    this.showPrompt();
  }

  dealer_changes(event: { component: IonicSelectableComponent, value: any}){
    console.log('event:', event);
    
    let term = this.arr_dealer.filter((person:any) => person.name == event.value.name );
    if(term.length>0){
      this.tempat_beli = term[0].idcust + '|' + term[0].name;
      this.tempat_beli_tampil = term[0].name;
    }else{
      this.tempat_beli = "";
    }

  }

  async showPrompt() {
    const prompt = await this.alertCtrl.create({
      message: "Masukkan Tempat Pembelian Anda",
      inputs: [
        {
          name: 'title',
          placeholder: 'Keyword'
        },
      ],
      buttons: [
        {
          text: 'Batal',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.tempat_beli = data.title;
            this.tempat_beli_tampil = data.title;
          }
        }
      ]
    });
    prompt.present();
  }

  loadMetode(){
    delete this.param.params.sc;
    this.param['params']['lang'] = 'id';
    this.param['params']['c'] = 'sellout_metode_klaim_revisi';
    this.metodeKlaim=[];
    this.api.getCSApi(this.param).then(result => 
    {
  
      const data:any = result;
      this.arr_field_metode = data['field_klaim'];
      this.kontenMetodeKlaim =  data['konten_metode_klaim'];
      var q = 0;
      for (var mtd in this.kontenMetodeKlaim) {
        this.metodeKlaim.push({
          'index' : mtd,
          'nama' : data['metode_klaim'][mtd]
        });
        q++;
      }
      console.log(this.metodeKlaim);
    });
  }

  goBack() { 
    this.router.navigate(['/list-garansi']);
  }

  takePhotoKTP(sourceType:number,req:any){
    this.router.navigate(['/camera-preview',{
      data: this,
      req: req,
      source: sourceType
    }])
  }

  async goprofile(){

    let modal = await this.modalCtrl.create({
      component: ProfileFormPage
    });
    modal.onDidDismiss().then(() => {
      this.ngOnInit()
    });
    modal.present();
  }

  loadLang(){
    
    this.api.getBahasa().then(result => 
    {
      const lang:any = result;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.language = lang;
        this.label_klaim_cashback_silahkan_lengkapi = lang['id'].mulai_registrasi_garansi.label_klaim_cashback_silahkan_lengkapi;
        this.label_faktur_harus_difoto = lang['id'].mulai_registrasi_garansi.label_faktur_harus_difoto;
        this.label_konten_syarat_dan_ketentuan = lang['id'].mulai_registrasi_garansi.label_konten_syarat_dan_ketentuan;
        this.label_foto_faktur = lang['id'].mulai_registrasi_garansi.label_foto_faktur;
        this.label_ktp = lang['id'].mulai_registrasi_garansi.label_ktp;
        this.label_selfie = lang['id'].mulai_registrasi_garansi.label_selfie;
        this.label_tanggal_pembelian = lang['id'].mulai_registrasi_garansi.label_tanggal_pembelian;
        this.label_tanggal_pembelian_catatan = lang['id'].mulai_registrasi_garansi.label_tanggal_pembelian_catatan;
        this.label_tempat_pembelian = lang['id'].mulai_registrasi_garansi.label_tempat_pembelian;
        this.judul = lang['id'].mulai_registrasi_garansi.judul;
        this.input_b_tambah_produk_registrasi = lang['id'].mulai_registrasi_garansi.input_b_tambah_produk_registrasi;
        this.label_data_pembelian = lang['id'].mulai_registrasi_garansi.label_data_pembelian;
        this.label_no_seri_produk =lang['id'].mulai_registrasi_garansi.label_no_seri_produk;
        this.judul_notifikasi = lang['id'].umum.judul_notifikasi;
        this.label_klaim_cashback_metode_pembayaran = lang['id'].mulai_registrasi_garansi.label_klaim_cashback_metode_pembayaran;
        this.konfirmasi_kirim_registrasi_garansi =lang['id'].mulai_registrasi_garansi.konfirmasi_kirim_registrasi_garansi;
        this.judul_konfirmasi = lang['id'].umum.judul_konfirmasi;
        this.label_data_klaim_cashback = lang['id'].mulai_registrasi_garansi.label_data_klaim_cashback;
        this.label_b_sellout_produk = lang['id'].mulai_registrasi_garansi.label_b_sellout_produk;
        this.input_b_kirim_registrasi = lang['id'].mulai_registrasi_garansi.input_b_kirim_registrasi;
        this.notif_mohon_lengkapi_profil_anda = lang['id'].umum.notif_mohon_lengkapi_profil_anda;

        this.cek_saja();

        
      }else{
        this.api.showAlertString("Gagal terhubung dengan server, mohon periksa kembali jaringan internet anda.");
      }
    });
          
        
  }

  cek_saja(){
    this.param = {
      params: {
        c: 'sellout_product',
        sc: 'cek_saja',
      }
    };

    this.api.getCSApi(this.param).then(result => 
    {
      const data:any = result;
        if(data['error'] == undefined) {
          this.data_awal = data['awal'];
          this.data_akhir= data['akhir'];
 
          this.label_klaim_cashback_pelanggan_terhormat = this.language['id']['mulai_registrasi_garansi']['label_klaim_cashback_pelanggan_terhormat'].replace(/#periode_sellout#/, this.api.format_tanggal( this.data_awal, this.arr_bulan ) + " - " + this.api.format_tanggal( this.data_akhir, this.arr_bulan ));

        }
    });
  }

  getMorePorts(event: { component: IonicSelectableComponent,text: string}) {
    let text = (event.text || '').trim().toLowerCase();

    // There're no more ports - disable infinite scroll.
    // if (this.page > 3) {
    //   event.component.disableInfiniteScroll();
    //   return;
    // }
    this.getPortsAsync(this.page, 15).subscribe(ports => {
      ports = event.component.items.concat(ports);

      if (text) {
        ports = this.filterPorts(ports, text);
      }

      event.component.items = ports;
      event.component.endInfiniteScroll();
      this.page++;
    });
  }

  searchPorts(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      //ini untuk menampilkan semua list di awal
      //event.component.items = this.getCountries(1, 15);
      //ini jika diawal dikosongkan
      event.component.items = []
      
      // Enable and start infinite scroll from the beginning.
      this.page = 2;
      event.component.endSearch();
      return;
    }

    this.portsSubscription = this.getPortsAsync().subscribe((ports:any) => {
      if (this.portsSubscription.closed) {
        return;
      }

      if(text.length>2){
        event.component.items = this.filterPorts(ports, text);
        event.component.endSearch();
      }else{
        if (this.portsSubscription) {
          this.portsSubscription.unsubscribe();
        }
        event.component.items = []
        this.page = 2;
        event.component.endSearch();
        return;
      }
      
    });
  }

  getPortsAsync(pages?: number, size?: number, timeout = 1000): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(this.getCountries(pages, size));
      observer.complete();
    }).pipe(delay(timeout));
  }

  getCountries(pages?: number, size?: number) {
    let countries = [];
    if (pages && size) {
      countries = this.arr_dealer.slice((pages - 1) * size, ((pages - 1) * size) + size);
    } else {
      countries = this.arr_dealer;
    }
    return countries;
  }
  filterPorts(ports:any, text: string) {
    return ports.filter((port:any) => {
      return port.name.toLowerCase().indexOf(text) !== -1 ||
        port.idcust.toString().toLowerCase().indexOf(text) !== -1;
    });
  }

  onChangeTanggal(event:any) {
    this.tgl_beli = moment(event.detail.value).format("YYYY-MM-DD");
    // this.tanggal = event.year + '-' + (event.month<10 ? '0'+event.month : event.month) + '-'  + (event.day<10 ? '0'+event.day : event.day);
    this.tanggal = (this.tanggal == undefined ? moment().format("YYYY-MM-DD") : moment(event.detail.value).format("YYYY-MM-DD"));
    this.param = {
      params: {
        c: 'sellout_product',
        sc: 'cek_saja',
        tgl: this.tanggal
      }
    };

    this.api.getCSApi(this.param).then(result => 
    {
      const data:any = result;
      this.label_klaim_cashback_pelanggan_terhormat = this.language['id'].mulai_registrasi_garansi.label_klaim_cashback_pelanggan_terhormat.replace(/#periode_sellout#/, this.api.format_tanggal( data['awal'], this.arr_bulan ) + " - " + this.api.format_tanggal( data['akhir'], this.arr_bulan ));
      this.modal.dismiss(null, 'cancel');
    });
  }

  async scanBarcode(index:any) {
    let modal = await this.modalCtrl.create({ 
      component : ScannerPage, 
      componentProps: {
        data: this,
        index: index
    }});
    modal.present();

    const { data } = await modal.onWillDismiss();
    if(data != undefined){
      this.valChange(data.replace(/\s+/g, ''), index);
      this.values[index] = data.replace(/\s+/g, '')
    }
  }

  isi_surat(){
    this.router.navigate(['/surat-pernyataan',{
      data: this
    }])
    // this.navCtrl.navigateForward('');
  }

  valChange(value: string, index:number):void{
    // let value:string = event.target.value;
    this.display = 'block';
    this.values[index] = value.replace(/\s+/g, '');
    this.param = {
        params: {
        ws: 'cek_data_registrasiproduk',
        sn: value,
        }
    };

    this.api.getApi(this.param).then(result => 
    {
      const data:any = result;
      this.labels[index] = '';
      if(data['error'] == undefined) {
        if(data['item'] != ''){
          if(data['item'] == "duplikasi" ) {
            this.labels[index] = this.language['id']['mulai_registrasi_garansi']['label_produk_error_1'];
            this.valids[index] = '0';
          }else{
            this.labels[index] = data['item'];
            this.valids[index] = '1';
          }
        }else{
          this.labels[index] = this.language['id']['mulai_registrasi_garansi']['label_produk_error_2'];
        }
      }else{
          alert(JSON.stringify(data['error']));
      }
    });
  }

  sent(){
    var text ='';
    try {
      if(this.mk>0){
        this.param['params']['lang'] = 'id';
        this.param['params']['c'] = 'sellout_metode_klaim';
        this.param['params']['sc'] = 'validasi_sellout_klaim';
        this.param['params']['metode_klaim'] = this.mk;
        this.api.getCSApi(this.param).then(result => 
        {
          const data:any = result;
          for(var l = 0; l < data['wajib_diisi'].length; l++){
            let obj:any = document.getElementById(data['wajib_diisi'][l]);
            if(obj['value'].trim() == '' ){
              text += "- " + data['wajib_diisi_label'][l] + ' ' + this.language['id']['validasi'].required + '<br>';
            }else{
              if(obj.id == 'nik'){
                if(!/^[0-9]+$/.test(obj['value'].trim())){
                  text += "- Nik hanya boleh diisi angka..!<br>";
                }
                if(obj['value'].length <16){
                  text += "- Nik harus 16 digits angka..!<br>";
                }
              }
            }
          }
          this.subvalidandSubmit(text, data['wajib_diisi']);
        });
      }else{
        this.subvalidandSubmit(text);
      }
    } catch (error:any) {
      this.api.showAlert(error);
    }
  }

  validasiExtra(text:string){
    if(this.tempat_beli=='' || this.tempat_beli == undefined){
      text += "- " + this.label_tempat_pembelian + ' ' + this.language['id']['validasi'].required + '<br>';
    }
    if(this.tgl_beli=='' || this.tgl_beli == undefined){
      text += "- " + this.label_tanggal_pembelian + ' '+ this.language['id']['validasi'].required +'<br>';
    }
    if(this.base64Image == "./assets/images/img-not-found.jpg"){
      text += "- " + this.label_foto_faktur + ' '+ this.language['id']['validasi'].required +'<br>';
    }
    if(this.base64Image_pernyataan == "./assets/images/img-not-found.jpg" && this.jml_verifikasi > 3){
      text += "- Surat Pernyataan " + this.language['id']['validasi'].required +'<br>';
    }
    if(this.base64Image_ktp == "./assets/images/ktp.png"){
      text += "- KTP " + this.language['id']['validasi'].required +'<br>';
    }
    // if(this.base64Image_selfie == "./assets/images/selfie.png"){
    //   text += "- Foto Diri " + this.language['id']['validasi'].required +'<br>';
    // }
    if(this.mk==0){
      text += "- " + this.label_klaim_cashback_metode_pembayaran + ' '+ this.language['id']['validasi'].combo +'<br>';
    }

    this.values.sort();

    this.values.forEach(function (value, index, arr){

        let first_index = arr.indexOf(value);
        let last_index = arr.lastIndexOf(value);

        if(first_index !== last_index){
          text += "- " + value + ' tidak boleh duplikat' +'<br>';
        }
    });
    return text;
  }

  subvalidandSubmit(text:string, arr_metode_klaim = []){
    text = this.validasiExtra(text);
    if(this.values.length == 0) {
      text +="- Nomor Seri tidak boleh kosong !" + '<br>';
      if(text != ''){
        this.api.presentToast('bottom',text)
        // this.api.showNotify(text,this.judul_notifikasi);
      }else{
        this.showConfirm(arr_metode_klaim);
      }
    }else{
      for(var k = 0; k < this.values.length; k++){
 
        if(this.values[k]=='' || this.values[k] == undefined){
          text += "- " + this.label_no_seri_produk + ' ' + (k+1) + ' '+ this.language['id']['validasi'].required +'<br>';
        }else if(this.valids[k] !='1'){
          text += "- " + this.label_no_seri_produk + ' '+ this.language['id']['validasi'].notvalid +'<br>';
        }
  
        this.param = {
          params: {
            ws: 'cek_data_registrasiproduk',
            sn: this.values[k],
          }
        };
  
        this.api.getApi(this.param).then(result => 
        {
          const data:any = result;
          if(data['error'] == undefined) {
            if(data['item'] != ''){
              if(this.mode != 'revisi'){
                if(data['item'] == "duplikasi" ) {
                  text += "- " + this.language['id']['mulai_registrasi_garansi']['label_produk_error_1'] +'<br>';
                }
              }
            }else{
              text += "- " + this.language['id']['mulai_registrasi_garansi']['label_produk_error_2'] +'<br>';
            }
            
            if(text != ''){
              // this.api.showNotify(text,this.judul_notifikasi);
              this.api.presentToast('bottom',text)
            }else{
              this.showConfirm(arr_metode_klaim);
            }
  
          }else{
              alert(JSON.stringify(data['error']));
          }
        });
      }
    }
  }

  kirim_email(garansi_id:number){
    this.param = {
      params: {
        sc: 'kirim_email',
        tm: garansi_id,
        ws: 'upload_garansi'
      }
    };
    this.api.getApi(this.param).then(data => 
    {
      // alert("error : "+JSON.stringify(data));
    });
  }

  async showConfirm(par_metode:any) {
    
    this.param = {
      params: {
        ws: 'registrasi_garansi_simpan',
        sel_metode_klaim: this.mk,
        hd_tanggal_pembelian: this.tgl_beli,
        t_tempat_pembelian: this.tempat_beli,
        konsumen_id: this.konsumen_id
      }
    };
    if(this.mode == 'revisi'){
      this.param['params']['sc'] = 'revisi';
      this.param['params']['par_membersproductid'] = this.produk_id;
    }

    for(var l = 0; l < par_metode.length; l++){
      let obj:any = document.getElementById(par_metode[l]);
      this.param['params'][par_metode[l]] = obj['value'];
    }

    for(var k = 1; k < this.values.length+1; k++){
      this.param['params']['t_produk_' + k] = this.values[k-1]; 
    }

    const confirm = await this.alertCtrl.create({
      message: this.konfirmasi_kirim_registrasi_garansi,
      header: this.judul_konfirmasi,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.api.getApi(this.param).then(result => 
            {
              const data:any = result;
              if(data['error'] == undefined) {
                if(this.f_ktp){
                  this.pushJpeg(data['garansi_id'] , this.base64Image_ktp,'ktp');
                }
                // if(this.f_selfie){
                //   this.pushJpeg(data['garansi_id'] , this.base64Image_selfie,'selfie');
                // }
                if(this.f_garansi){
                  this.pushImage(data['garansi_id'] , this.base64Image);
                }
                if(this.jml_verifikasi > 3 || this.base64Image_pernyataan != './assets/images/img-not-found.jpg'){
                  this.pushImagePernyataan(data['garansi_id'] , this.base64Image_pernyataan);
                }
                
                if(this.mode == 'revisi' && this.f_garansi == false){
                  this.kirim_email(data['garansi_id']);
                }
                this.router.navigate(['/home'])
              }else{
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

  async pushJpeg(picture:any, photo:any, jenis: string){
    const loader = await this.loadingCtrl.create({
        message: "Uploading Images...",
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
        fileKey: 'file',
        mimeType :'image/jpeg',
        fileName: picture,
        chunkedMode: false,
        headers: {
          Connection: "close"
        }
    }
    let status_upload = false;
    var url = this.api.url_ajax_modena + '?ws=upload_garansi&sc=' + jenis;
    fileTransfer.upload(photo, url, options,true)
    .then((data) => { 
        loader.dismiss();
    }, (err) => {
        loader.dismiss();
    });
  }

  async pushImage(picture:any, photo:any){
    const loader = await this.loadingCtrl.create({
        message: "Uploading Faktur...",
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
        fileKey: 'file',
        mimeType :'image/jpeg',
        fileName: picture,
        chunkedMode: false,
        headers: {
          Connection: "close"
        }
    }
    let status_upload = false;
    var url = this.api.url_ajax_modena + '?ws=upload_garansi';
    fileTransfer.upload(photo, url, options)
    .then((data) => { 
        loader.dismiss();
    }, (err) => {
        loader.dismiss();
        // alert("error : "+JSON.stringify(err));
    });
  }  

  async pushImagePernyataan(picture:any, photo:any){
    const loader = await this.loadingCtrl.create({
      message: "Uploading Surat Pernyataan...",
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
        fileKey: 'file',
        mimeType :'image/jpeg',
        fileName: picture,
        chunkedMode: false,
        headers: {}
    }
    let status_upload = false;
    var url = this.api.url_ajax_modena + '?ws=upload_garansi&sc=surat_pernyataan';
    fileTransfer.upload(photo, url, options)
    .then((data) => { 
      // alert(JSON.stringify(data));
      loader.dismiss();
      // this.navCtrl.setRoot(HomePage);
    }, (err) => {
      loader.dismiss();
        // alert("error : "+JSON.stringify(err));
    });
    
  }  

  setuju(val:boolean){
    this.disabled = val;
  }

  onChangeMetode(val:any){
    this.mk = val;
    var field_terdaftar = this.arr_field_metode[val];
    if(parseInt(val)>0){
      if(parseInt(val) == 1){
        if(this.hp_klaim != undefined){
          let arr_data_hp = this.hp_klaim.split('|');
          this.konten_metode_klaim =  this.sanitizer.bypassSecurityTrustHtml(this.kontenMetodeKlaim[val].replace(arr_data_hp[0] + '|' + arr_data_hp[1] + '"', arr_data_hp[0] + '|' + arr_data_hp[1] + '" selected').replace(/#bank_norekening#/,(arr_data_hp[2] == undefined ? '' : arr_data_hp[2]) ).replace(/#bank_norekening_atasnama#/,(arr_data_hp[3] == undefined ? '' : arr_data_hp[3]) ).replace(/#nik#/,(arr_data_hp[4] == undefined ? '' : arr_data_hp[4]) ));
        }else{
          this.konten_metode_klaim =  this.sanitizer.bypassSecurityTrustHtml(this.kontenMetodeKlaim[val].replace(/#bank_norekening_atasnama#/,"" ).replace(/#nik#/,"" ));
        }
      }else {
        let hp_str='';
        this.konten_metode_klaim = this.sanitizer.bypassSecurityTrustHtml(this.kontenMetodeKlaim[val]);
        let arr_field = field_terdaftar.split('|');

        if(this.hp_klaim != undefined){
          var i;
          let arr_data_hp = this.hp_klaim.split('|');
        
          for (i = 0; i < arr_field.length; i++) {
            this.konten_metode_klaim =  this.sanitizer.bypassSecurityTrustHtml(this.konten_metode_klaim.replace('#' + arr_field[i] + '#', (arr_data_hp.length == arr_field.length ? arr_data_hp[i] : '') ));
          }

        }else{
          hp_str = this.profile['handphone'];
          this.konten_metode_klaim =  this.sanitizer.bypassSecurityTrustHtml(this.kontenMetodeKlaim[val].replace(/#no_ponsel#/,hp_str ));

          for (i = 0; i < arr_field.length; i++) {
            this.konten_metode_klaim =  this.sanitizer.bypassSecurityTrustHtml(this.konten_metode_klaim.replace('#' + arr_field[i] + '#', '' ));
          }
        }
        
      }
      
    }else{
      this.konten_metode_klaim = '';
    }
  }

  pilih(){
    this.router.navigate(['/cashback',{
      tgl: (this.tanggal == undefined ? moment().format("YYYY-MM-DD") : this.tanggal)
    }])
  }

  addNewProject() {
    let control = <FormArray>this.myForm.controls.projects;
    control.push(
      this.formBuilder.group({
          projectName: ['']
      })
    )
    this.jml_verifikasi = this.jml_verifikasi+1;
  }
  deleteProject(index:any) {
    let control = <FormArray>this.myForm.controls.projects;
    control.removeAt(index);
    this.labels.splice(index,1);
    this.values.splice(index,1);
    this.jml_verifikasi = this.jml_verifikasi-1;
  }

}
