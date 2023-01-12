import { ActivatedRoute } from '@angular/router';
import { Kategori } from './../../models/Kategori';
import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { Dersler } from './../../models/Dersler';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ders',
  templateUrl: './dersler.component.html',
  styleUrls: ['./dersler.component.scss']
})
export class DerslerComponent implements OnInit {
  dersler!: Dersler[];
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secDers!: Dersler;
  katId!:string;
  secKat: Kategori = new Kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    dersadi: new FormControl(),
    derskredi: new FormControl(),
    categoryId: new FormControl(),
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
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriListele();

      }
    });
    this.KategoriListele();
  }
  KatSec(katId: string) {
    this.katId = katId;
    this.KategoriListele();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      categoryId: this.katId
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ders Ekle";
    this.modal.show();
  }
  Duzenle(ders: Dersler, el: HTMLElement) {
    this.frm.patchValue(ders);
    this.modalBaslik = "Ders Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ders: Dersler, el: HTMLElement) {
    this.secDers = ders;
    this.modalBaslik = "Ders Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  DersListele() {
    this.fbservis.DersListeleByKatId(this.katId).subscribe((d: Dersler[]) => {
      this.dersler = d;
    });
  }
  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  DersEkleDuzenle() {
    var ders: Dersler = this.frm.value
    var tarih = new Date();
    if (!ders.dersid) {
      var filtre = this.dersler.filter(s => s.dersadi == ders.dersadi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Ders Adı Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        ders.kaytarih = tarih.getTime().toString();
        ders.duztarih = tarih.getTime().toString();
        this.fbservis.DersEkle(ders).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Ders Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.DersListele();
          this.modal.toggle();
        });
      }
    } else {
      ders.duztarih = tarih.getTime().toString();
      this.fbservis.DersDuzenle(ders).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ders Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.DersListele();
        this.modal.toggle();
      });
    }

  }
  DersSil() {
    this.fbservis.DersSil(this.secDers).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ders Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.DersListele();
      this.modal.toggle();
    });
  }
}
