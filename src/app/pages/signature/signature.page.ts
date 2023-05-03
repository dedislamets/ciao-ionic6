import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { SignaturePad } from 'angular2-signaturepad';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  @ViewChild(SignaturePad, {static: true}) public signaturePad:any = SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string ="";
  ron: string = "";

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log('signature pad', this.signaturePad);
    }, 1000);
  }

  drawCancel() {
    this.router.navigate(['/surat-pernyataan'])
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    // this.navParams.get('signatureImage').signatureImage = this.signatureImage;
    this.modalCtrl.dismiss(this.signatureImage);
    // this.router.navigate(['/surat-pernyataan', 
    // {
    //   signatureImage : this.signatureImage
    // },
    // ])
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
    let canvas: any = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', 340);
    this.signaturePad.set('canvasHeight', 200);
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }

}
