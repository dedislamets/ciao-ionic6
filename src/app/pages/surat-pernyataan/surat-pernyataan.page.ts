import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonRouterOutlet, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import * as moment from 'moment';
import domtoimage from 'dom-to-image';
import { SignaturePage } from '../signature/signature.page';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-surat-pernyataan',
  templateUrl: './surat-pernyataan.page.html',
  styleUrls: ['./surat-pernyataan.page.scss'],
})
export class SuratPernyataanPage implements OnInit {

  konten:any;
  param:any;
  signatureImage : string = './assets/images/signhere.png';

  constructor(
    private sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private api: HelperService,
    private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private navParams : NavParams,
    private events: EventService
  ) { 
    console.log(navParams)
  }

  ngOnInit() {
    this.loadKonten();
  }

  loadKonten(){
    this.param = {
      params: {
        c: 'load_form_surat_pernyataan',
      }
    };
    this.api.getCSApi(this.param).then(res => 
    {
      const data:any = res;
      this.konten =  this.sanitizer.bypassSecurityTrustHtml(data['konten_upload']);
    });
  }

  goBack() { this.routerOutlet.pop(); }

  async submit(){
    let node: any = document.getElementById('copy-html');
    var elm = node.getElementsByClassName("isian")[0];
    var str_replace="<table style='margin-bottom:10px;'>";
    for(var l = 0; l < elm.childElementCount; l++){
      if(elm.children[l].getElementsByClassName("text-box")[0]["value"]==""){
        this.api.showAlertString(elm.children[l].getElementsByClassName("text-box")[0].parentElement.firstElementChild["innerText"].replace(":","") + 'tidak boleh kosong!');
        return;
      }
      if(this.signatureImage == './assets/images/signhere.png'){
        this.api.showAlertString('Tanda tangan diperlukan!');
        return;
      }

      str_replace += "<tr><td>" + elm.children[l].getElementsByClassName("text-box")[0].parentElement.firstElementChild["innerText"].replace(":","")  +"</td><td>:</td><td>" + elm.children[l].getElementsByClassName("text-box")[0]["value"] + "</td></tr>";
    
    }
    const loader = await this.loadingCtrl.create({
      message: "Generate Surat Pernyataan...",
    });
    loader.present();
    
    str_replace +="</table>";
    node.getElementsByClassName("tanggal")[0].innerHTML =  moment().format("DD MMM YYYY");
    // node.getElementsByClassName("no-save")[0].innerHTML = "";
    // node.getElementsByClassName("ttd")[0].innerHTML =  '<div style="background-color: #fff;" ><img style="width: 100%;" src="' +  this.signaturePad.toDataURL(); +'" />';
    elm.innerHTML="";
    elm.innerHTML = str_replace;
    let base64Image_coba:string;

    const scale = 750 / node.offsetWidth;
    domtoimage
    .toPng(node, {
        // height: node.offsetHeight * scale,
        // width: node.offsetWidth * scale,
        // style: {
        //   transform: "scale(" + scale + ")",
        //   transformOrigin: "top left",
        //   width: node.offsetWidth + "px",
        //   height: node.offsetHeight + "px"
        // },
        quality: 0.75
    })
    .then((dataUrl:any) => {
      base64Image_coba = dataUrl;
      loader.dismiss();
      this.events.publishSomeData({
        base64Image_pernyataan: dataUrl
      });
      this.routerOutlet.pop();

    })
    .catch((error:any) => {
        console.error("oops, something went wrong!", error);
    });
  }


  async openSignatureModel(){
    
    let modal = await this.modalController.create({
      component : SignaturePage
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    this.signatureImage = data;
  }

}
