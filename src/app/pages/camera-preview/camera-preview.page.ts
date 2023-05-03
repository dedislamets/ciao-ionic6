import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@awesome-cordova-plugins/camera-preview/ngx';
import { IonRouterOutlet } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.page.html',
  styleUrls: ['./camera-preview.page.scss'],
})
export class CameraPreviewPage implements OnInit {

  source:number = 0;
  req: string = ""
  constructor(
    private cameraPreview: CameraPreview,
    private route: ActivatedRoute,
    private events: EventService,
    private routerOutlet: IonRouterOutlet
  ) { 
    this.route.params.subscribe(params => {
      this.source = params["source"];
      this.req = params["req"];
      this.startCamera();
    });
  }

  ngOnInit() {
  }

  ionViewWillLeave(){

    window.document.querySelector('ion-app')?.classList.remove('cameraView');
  
  }

  startCamera(){
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 50,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
      tapPhoto: false,
      previewDrag: true,
      toBack: true,
      alpha: 1,
      storeToFile: false
    }

    if(this.source == 2){
      cameraPreviewOpts.camera = this.cameraPreview.CAMERA_DIRECTION.FRONT;
    }
    

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
    (res) => {
      // alert(res)
    },
    (err) => {
      // alert(err)
      this.cameraPreview.show();
    });
    // window.document.querySelector('ion-app').classList.add('cameraView');

    var rect = document.getElementById("rect_class");

    // Get rectangle coordinates
    // var rect_coords = rect.getBoundingClientRect();
    // var x_coord = rect_coords.left, y_coord = rect_coords.top;

    let approot = document.getElementsByClassName("app-root") as HTMLCollectionOf<HTMLElement>;
    for(var i = approot.length - 1; i >= 0; --i)
    {
      approot[i].style.backgroundColor = "transparent";
    } 

    var elements = document.getElementsByClassName("content") as HTMLCollectionOf<HTMLElement>;
    for(var i = elements.length - 1; i >= 0; --i)
    {
        elements[i].style.backgroundColor = "transparent";
    } 
  }

  stopCamera(){
    this.cameraPreview.stopCamera();
  }


  takePicture(){

    const pictureOpts: CameraPreviewPictureOptions = {
      quality: 85
    }
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {


      
      // this.navParams.get('data')[this.req] = 'data:image/jpeg;base64,' + imageData;
      
      if(this.source == 1){
        let arr_subscribe = {
          req: 'data:image/jpeg;base64,' + imageData,
          jenis: this.req,
          f_ktp: true
        }
        this.events.publishSomeData(arr_subscribe)
      }else if(this.source == 2){
        // this.navParams.get('data').f_selfie = true;
        let arr_subscribe = {
          req: 'data:image/jpeg;base64,' + imageData,
          jenis: this.req,
          f_selfie: true
        }
        this.events.publishSomeData(arr_subscribe)
      }else if(this.source == 3){
        // this.navParams.get('data').f_garansi = true;
        let arr_subscribe = {
          req: 'data:image/jpeg;base64,' + imageData,
          jenis: this.req,
          f_garansi: true
        }
        this.events.publishSomeData(arr_subscribe)
      }


      this.dismiss();
      
    });
  }


  resetPicture(){
    this.startCamera();
    if(this.source == 1){
      // this.navParams.get('data').base64Image_ktp = './assets/images/ktp.png';
      this.events.publishSomeData({
        base64Image_ktp: './assets/images/ktp.png'
      })
    }else{
      // this.navParams.get('data').base64Image_selfie = './assets/images/selfie.png'
      this.events.publishSomeData({
        base64Image_selfie: './assets/images/selfie.png'
      })
    }
  }


  SwitchCamera(){
    this.cameraPreview.switchCamera();
  }
  showCamera(){
    this.cameraPreview.show();
  }
  hideCamera(){
    this.cameraPreview.hide();
  }

  dismiss() {
    this.cameraPreview.stopCamera();
    // this.cameraPreview.hide();

    let approot = document.getElementsByClassName("app-root") as HTMLCollectionOf<HTMLElement>;
    for(var i = approot.length - 1; i >= 0; --i)
    {
      approot[i].style.backgroundColor = "#fff";
    } 

    var elements = document.getElementsByClassName("content") as HTMLCollectionOf<HTMLElement>;
    for(var i = elements.length - 1; i >= 0; --i)
    {
        elements[i].style.backgroundColor = "#fff";
    } 
    this.routerOutlet.pop();

  }
}
