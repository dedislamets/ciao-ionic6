import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GaransiFormPage } from './pages/garansi-form/garansi-form.page';
import { ListGaransiPage } from './pages/list-garansi/list-garansi.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  {
    path: 'list-experience',
    loadChildren: () => import('./pages/list-experience/list-experience.module').then( m => m.ListExperiencePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'list-promo',
    loadChildren: () => import('./pages/list-promo/list-promo.module').then( m => m.ListPromoPageModule)
  },
  {
    path: 'list-garansi',
    loadChildren: () => import('./pages/list-garansi/list-garansi.module').then( m => m.ListGaransiPageModule),
    // component: ListGaransiPage,
  },
  {
    path: 'detail-experience',
    loadChildren: () => import('./pages/detail-experience/detail-experience.module').then( m => m.DetailExperiencePageModule)
  },
  {
    path: 'detail-promo',
    loadChildren: () => import('./pages/detail-promo/detail-promo.module').then( m => m.DetailPromoPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'garansi-detail',
    loadChildren: () => import('./pages/garansi-detail/garansi-detail.module').then( m => m.GaransiDetailPageModule)
  },
  {
    path: 'garansi-form',
    loadChildren: () => import('./pages/garansi-form/garansi-form.module').then( m => m.GaransiFormPageModule)
  },
  {
    path: 'manual-book',
    loadChildren: () => import('./pages/manual-book/manual-book.module').then( m => m.ManualBookPageModule)
  },
  {
    path: 'camera-preview',
    loadChildren: () => import('./pages/camera-preview/camera-preview.module').then( m => m.CameraPreviewPageModule)
  },
  {
    path: 'profile-form',
    loadChildren: () => import('./pages/profile-form/profile-form.module').then( m => m.ProfileFormPageModule)
  },
  {
    path: 'surat-pernyataan',
    loadChildren: () => import('./pages/surat-pernyataan/surat-pernyataan.module').then( m => m.SuratPernyataanPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./pages/scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'cashback',
    loadChildren: () => import('./pages/cashback/cashback.module').then( m => m.CashbackPageModule)
  },
  {
    path: 'signature',
    loadChildren: () => import('./pages/signature/signature.module').then( m => m.SignaturePageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'pinpassword',
    loadChildren: () => import('./pages/pinpassword/pinpassword.module').then( m => m.PinpasswordPageModule)
  },
  {
    path: 'password-baru',
    loadChildren: () => import('./pages/password-baru/password-baru.module').then( m => m.PasswordBaruPageModule)
  },
  {
    path: 'list-experience-chef',
    loadChildren: () => import('./pages/list-experience-chef/list-experience-chef.module').then( m => m.ListExperienceChefPageModule)
  },
  {
    path: 'list-experience-program',
    loadChildren: () => import('./pages/list-experience-program/list-experience-program.module').then( m => m.ListExperienceProgramPageModule)
  },
  {
    path: 'list-experience-gallery',
    loadChildren: () => import('./pages/list-experience-gallery/list-experience-gallery.module').then( m => m.ListExperienceGalleryPageModule)
  },
  {
    path: 'list-experience-promotion',
    loadChildren: () => import('./pages/list-experience-promotion/list-experience-promotion.module').then( m => m.ListExperiencePromotionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
