import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenpopibEbrpComponent } from './screenpopib-ebrp/screenpopib-ebrp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppDataService } from './app.dataservice';
import { CommonWebApiService } from './common-web-api.service';

@NgModule({
  declarations: [
    AppComponent,
    ScreenpopibEbrpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbModalModule,
    ReactiveFormsModule,

  ],
  providers: [AppDataService,CommonWebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
