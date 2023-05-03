import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  

  constructor(
    private modalCtrl: ModalController,
  ) {
    
   }
  
  
   async checkPermission () {
    const status = await BarcodeScanner.checkPermission();
  
    if (status.denied) {
      return false;
      
    }else{
      return true;
    }
  };

  async startScan () {
    try {
      const permission = await this.checkPermission();
      if(!permission){
        const c = confirm('If you want to grant permission for using your camera, enable it in the app settings.');
        if (c) {
          BarcodeScanner.openAppSettings();
        }
        return;
      }
      BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      document.querySelector('app-list-garansi')?.classList.add('hidden');
      document.querySelector('app-garansi-form')?.classList.add('hidden');
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.modalCtrl.dismiss(result.content);
        BarcodeScanner.showBackground();
        window.document.querySelector('body')?.classList.remove('scanner-active');
        document.querySelector('app-list-garansi')?.classList.remove('hidden');
        document.querySelector('app-garansi-form')?.classList.remove('hidden');
        console.log(result.content);
      }
    } catch (error) {
      alert(error)
      BarcodeScanner.stopScan();
    }
    
  };

  stopScan(){
    window.document.querySelector('body')?.classList.remove('scanner-active');
    document.querySelector('app-list-garansi')?.classList.remove('hidden');
    document.querySelector('app-garansi-form')?.classList.remove('hidden');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  ngOnInit() {
    this.startScan();
  //   this.zbarPlugin.scan(this.optionZbar)
  //  .then(respone => {
  //     console.log(respone);
  //     this.scannedOutput = respone;
  //     this.modalCtrl.dismiss(respone);
  //  })
  //  .catch(error => {
  //     alert(error);
  //  });
  }

  dismiss() {
    // let approot = document.getElementsByClassName("app-root") as HTMLCollectionOf<HTMLElement>;
    // for(var i = approot.length - 1; i >= 0; --i)
    // {
    //   approot[i].style.backgroundColor = "#fff";
    // } 

    // var elements = document.getElementsByClassName("content") as HTMLCollectionOf<HTMLElement>;
    // for(var i = elements.length - 1; i >= 0; --i)
    // {
    //     elements[i].style.backgroundColor = "#fff";
    // }
    // this.qrScanner.destroy();
    // this.navCtrl.pop();
    this.stopScan();

    this.modalCtrl.dismiss();

  }
}
