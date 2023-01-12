import { ActivatedRoute } from '@angular/router';
import { Dersler } from './../../models/Dersler';
import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { Odev } from './../../models/Odev';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.scss']
})
export class OdevComponent implements OnInit {
  odev!: Odev[];
  dersler!: Dersler[];
  modal!: Modal;
  modalBaslik: string = "";
  secOdev!: Odev;
  dersId!: string;
  secDers: Dersler = new Dersler();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    odevadi: new FormControl(),
    dersId: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public fbservis: FbservisService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.dersId) {
        this.dersId = p.dersId;
        this.DersListele();

      }
    });
    this.DersListele();

    
  }
  DersSec(dersId: string) {
    this.dersId = dersId;
    this.DersListele();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      dersId: this.dersId
    })
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ödev Ekle";
    this.modal.show();
  }
  Duzenle(odev: Odev, el: HTMLElement) {
    this.frm.patchValue(Odev);
    this.modalBaslik = "Ödev Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(odev: Odev, el: HTMLElement) {
    this.secOdev = odev;
    this.modalBaslik = "Ödev Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  OdevListele() {
    this.fbservis.OdevListeleByDersId(this.dersId).subscribe((d: Odev[]) => {
      this.odev = d;
    });
  }
  DersListele() {
    this.fbservis.DersListele().subscribe(d => {
      this.dersler = d;
    });
  }
  // DersGetir() {
  //   this.fbservis.DersById(this.dersId).subscribe((d: Dersler[]) => {
  //     this.secDers = d;
  //     this.OdevListele();
  //   });
  // } 
  OdevEkleDuzenle() {
    var odev: Odev = this.frm.value
    var tarih = new Date();
    if (!odev.id) {
      var filtre = this.odev.filter(s => s.odevadi == odev.odevadi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Ödev Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        odev.kaytarih = tarih.getTime().toString();
        odev.duztarih = tarih.getTime().toString();
        this.fbservis.OdevEkle(odev).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Ödev Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.OdevListele();
          this.modal.toggle();
        });
      }
    } else {
      odev.duztarih = tarih.getTime().toString();
      this.fbservis.OdevDuzenle(odev).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ödev Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.OdevListele();
        this.modal.toggle();
      });
    }

  }
  OdevSil() {
    this.fbservis.OdevSil(this.secOdev).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ödev Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.OdevListele();
      this.modal.toggle();
    });
  }


}
