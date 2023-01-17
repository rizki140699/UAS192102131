import { Component, AfterViewInit } from '@angular/core';

declare const $: any;

// mendefinisikan data mahasiswa
type Mahasiswa = {
  Alamat: string
  JenisKelamin: string
  JP: string
  Nama: string
  NIM: string
  StatusNikah: string
  TahunMasuk: string
  TanggalLahir: string
  TempatLahir: string
  Created: string
}

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})

export class MahasiswaComponent implements AfterViewInit {

  table: any;

  ngAfterViewInit(): void {

    // set variable table menjadi komponen datatable
    this.table = $("#table").DataTable()

    // mengambil data kemudian tampilkan pada komponent HTML tabel
    this.grabData()
  }

  /**
   * Mengambil data mahasiswa dari server STMIK
   * Mendefinisikan setiap baris data mahasiswa yang akan ditampilkan
   * Menampilkan setiap baris data yang telah disiapkan kedalam komponen tabel HTML
   */
  grabData(): void {

    // memulai http request
    fetch(`https://stmikpontianak.net/011100862/tampilMahasiswa.php`)
      .then((response: any) => {

        // mengubah resposne data dari text/html
        // menjadi application/json

        return response.json()
      })
      .then((response: any) => {

        // ambil setia baris data kemudian tampilkan pada setiap baris tabel
        response.forEach((element: Mahasiswa, i: number) => {

          // menggabungkan tempat lahir dan tanggal lahir\
          const tempat_tgl_lahir = `${element.TempatLahir} ${element.TanggalLahir}`

          // mendefinisikan data yang akan ditampilkan pada setiap baris tabel
          const baris = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempat_tgl_lahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk
          ]

          // menampilkan baris data pada tabel html
          this.table.row.add(baris)
        });

        this.table.draw(false)
      })
      .catch((err: unknown) => {
        console.log(err)
      })
  }

}
