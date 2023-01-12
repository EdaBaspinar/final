import { HotToastService,HotToastModule } from '@ngneat/hot-toast';
import { Sonuc } from '../models/Sonuc';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MytoastService {

  constructor(
    private toast: HotToastService,
    

  ) { }
  ToastUygula(sonuc: Sonuc) {

    if (sonuc.islem) {
      this.toast.success(sonuc.mesaj, {
        style: {
          border: '1px solid #2e7309',
          padding: '16px',
          color: '#2e7309',
        }
      });
    } else {
      this.toast.error(sonuc.mesaj, {
        style: {
          border: '1px solid #73091c',
          padding: '16px',
          color: '#73091c',
        }
      });
    }
  }
}


