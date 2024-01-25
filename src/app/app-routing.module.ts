import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenpopibEbrpComponent } from './screenpopib-ebrp/screenpopib-ebrp.component';

const routes: Routes = [{path:'',component:ScreenpopibEbrpComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
