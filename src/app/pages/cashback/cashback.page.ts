import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-cashback',
  templateUrl: './cashback.page.html',
  styleUrls: ['./cashback.page.scss'],
})
export class CashbackPage implements OnInit {

  public param:any;
  items: any;
  label_daftar_registrasi_produk_dengan_cashback: string = "";
  language:any;
  tanggal: any;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private api : HelperService,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe((params:any) => {
      this.tanggal = params.tgl; 
    });
    // this.tanggal = navParams.get("tgl");
    this.loadLang();
    this.loadItem();
  }

  ngOnInit() {
  }

  goBack() { 
    this.routerOutlet.pop(); 
  }

  loadLang(){
  
    this.api.getBahasa().then(res => 
    {
      const lang:any = res;
      if(lang['error'] == undefined) {
        this.language = JSON.stringify(lang);
        this.label_daftar_registrasi_produk_dengan_cashback = lang['id'].mulai_registrasi_garansi.label_daftar_registrasi_produk_dengan_cashback;
      }else{
        this.api.showAlert(JSON.stringify(lang['error']));
      }
    });
    
}

  loadItem(){
    this.param = {
      params: {
        c: 'sellout_product',
        tgl: this.tanggal
      }
    };
    this.api.getCSApi(this.param).then(res => 
    {
      const data:any = res
      this.items = data['item'];
    });
  }
}
