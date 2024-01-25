import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenpopCCComponent } from './screenpop-cc/screenpop-cc.component';

const routes: Routes = [
  {
    path:'', component:ScreenpopCCComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
