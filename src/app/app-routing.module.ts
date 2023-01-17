import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MahasiswaComponent } from './mahasiswa/mahasiswa.component';

const routes: Routes = [
  {
    path: 'mahasiswa',
    component: MahasiswaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
