import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppDataService } from './app.dataservice';
import { Observable } from 'rxjs';



const baseIP = 'hbprdctiwbap1.hbctxdom.com:85';
const baseURL = 'https://' + baseIP + '/apiCTI/api/';

@Injectable({
  providedIn: 'root'
})

export class CommonWebApiService {
  constructor(private httpClient:HttpClient,private appDataService:AppDataService){}

  GETHistoryDetails(url: any, data: any): Observable<any> {
    return this.httpClient.get(url + 'GETHistoryDetails?registerMobNo' + data);
  }
  POSTInsertCallRemarks(url: any, data: any){
    return this.httpClient.post(url + 'POSTInsertCallRemarks', data);
  }

  POSTInsertAgentRemarks(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertAgentRemarks', data);
  }

  GetBOGroupParent(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'GetBOGroupParent', data);
  }
  GetBusinessOutCome(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'GetBusinessOutCome', data);
  }
  GetBusinessOutcomeParent(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + ' GetBusinessOutcomeParent', data);
  }
  GetModes(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'GetModes', data);
  }

  GETHistoryDetails1(url: any, data: any,data1:any): Observable<any> {
    return this.httpClient.get(url + 'GETHistoryDetails?ani' + data + data1);
  }
  GetScreenPopData(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'GetScreenPopData', data);
  }

  POSTInsertCallData(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertCallData', data);
  }
  POSTInsertOutcome(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertOutcome', data);
  }
  SetBusinessOutcomeWithComments(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'SetBusinessOutcomeWithComments', data);
  }

  POSTInsertDNC(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + ' POSTInsertDNC', data);
  }
  SetCallOutcome(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'SetCallOutcome', data);
  }
  POSTInsertCallBackData(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'POSTInsertCallBackData', data);
  }
  SetCallbackWithComments(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'SetCallbackWithComments', data);
  }
  SetPersonalCallbackWithComments(url:any,data: any): Observable<any> {
    return this.httpClient.post(url + 'SetPersonalCallbackWithComments', data);
  }
}
