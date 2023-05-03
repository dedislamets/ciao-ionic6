import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private uuid: any ;
  public data_teknisi: any;
  moda: string = 'Production';
  base_url_ajax_modena: string = 'https://www.modena.co.id/';
  url_ajax_modena: string = 'https://apiciao.modena.com/ws_index_ded.php';
  url_new_modena: string = 'https://www.modena.com/service/api/';
  versi = '3.0.25';

  private url: string = "https://apiciao.modena.com/ws_index_ded.php?ws=lang";
  private url_csapps: string = "https://apiciao.modena.com/ws_ded/csapps.php";
  public security_code:string = "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b";
  constructor(
    private http: HTTP, 
    public httpClient: HttpClient,
    private alertCtrl: AlertController,
    private sanitized: DomSanitizer,
    private toastController: ToastController
  ) { }

  getCSApi(param: any){
    return new Promise(resolve => {
      this.httpClient.post(this.url_csapps, null,param).subscribe(
          (data) => {
              resolve(data);
          }, err => {
              resolve(err);
          });
    });
  }

  getApi(param:any){
    return new Promise(resolve => {
        this.httpClient.post(this.url_ajax_modena, null,param).subscribe(
            (data) => {
                resolve(data);
            }, err => {
                resolve(err);
            });
    });
  }

  getNewApi(uri: string, param: any){
    return new Promise(resolve => {
        this.httpClient.get(this.url_new_modena + uri, param).subscribe(
            (data) => {
                resolve(data);
            }, err => {
                resolve(err);
            });
    });
}

  getBahasa(){
    return new Promise(resolve => {
        this.httpClient.post(this.url, null).subscribe(
            (data) => {
                resolve(data);
            }, err => {
                resolve(err);
            });
    });
  }

  async showAlertString(msg: string){
    let alert = await this.alertCtrl.create({
        header: '',
        subHeader: msg,
        buttons: ['OK']
    });
    alert.present();
  }
 async  showAlert(msg:any){
    let alert = await this.alertCtrl.create({
        header: '',
        subHeader: JSON.stringify(msg),
        buttons: ['OK']
    });
    alert.present();
  }

  toHTML(msg: string){
    return this.sanitized.bypassSecurityTrustHtml(msg);
  }

  format_tanggal(s:any, ad:any){
    if(s== null){
        return;
    }
    var arr_tanggal = s.split("-")
    return arr_tanggal[2] + " " + ad[ parseInt( arr_tanggal[1] ) - 1 ] + " " + arr_tanggal[0]
  }

  async showNotify(msg:string,judul: string){
    let alert = await this.alertCtrl.create({
        header: judul,
        subHeader: JSON.stringify(msg).toString().replace(/"/g, ""),
        buttons: ['OK']
    })
    alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
  
}
