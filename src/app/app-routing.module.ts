import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { OdevComponent } from './components/odev/odev.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { DerslerComponent } from './components/dersler/dersler.component';
import { MenuComponent } from './components/menu/menu.component';
const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {
    path: 'odev',
    component: OdevComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'menu',
    component: MenuComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'Kategoriler',
    component: KategoriComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'Dersler',
    component: DerslerComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'profil',
    component: ProfilComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'anasayfa',
    component: HomeComponent,
    ...canActivate(redirectToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }