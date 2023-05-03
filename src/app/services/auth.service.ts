import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  constructor(
    public api: HelperService,
    public facebook: Facebook,
    private googlePlus: GooglePlus,
    public ngFireAuth: AngularFireAuth
  ) { 
    
  }

  googlePlusLogin(){
    return new Promise((resolve, reject) => {
      this.googlePlus.login({
        webClientId: '1028513200033-gunnho6357sfs2tck1niv2f40lj4pfec.apps.googleusercontent.com'
      })
      .then( response => {
        
        const googleCredential = auth.GoogleAuthProvider.credential(null, response.accessToken);
        this.ngFireAuth.signInWithCredential(googleCredential)
          .then( success => {
            resolve(success);
          }).catch((err) => {
            reject(err);
          });
      }).catch((error) => { alert("Error : "+ error) });

    });
  }

  facebookLogin() {
    return new Promise((resolve, reject) => {
      this.facebook.login(['email']).then( response => {
        // this.api.showAlert(JSON.stringify(response));
        const facebookCredential = auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
          // this.api.showAlert(JSON.stringify(facebookCredential));
          this.ngFireAuth.signInWithCredential(facebookCredential)
          .then( success => { 
            resolve(success); 
          }).catch((err) => {
            reject(err);
          });
  
      }).catch((error) => { alert(JSON.stringify(error)) });

    });
  }

  logout(){
    this.googlePlus.logout();
    this.facebook.logout();
    this.ngFireAuth.signOut().then(function() {
      
    }, function(error) {
      console.log(error);
    });
  }
}
