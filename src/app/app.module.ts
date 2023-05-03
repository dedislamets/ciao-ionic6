import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@awesome-cordova-plugins/camera-preview/ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot({
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    IonicSelectableModule,
    SignaturePadModule
  ],
  exports: [SharedModule],
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    NativeStorage,
    InAppBrowser,
    HTTP,
    GooglePlus,
    Facebook,
    AngularFireAuth,
    FormBuilder,
    FileTransfer,
    NavParams,
    CameraPreview
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
