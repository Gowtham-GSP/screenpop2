import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
 

const baseIP = 'hbprdctiwbap1.hbctxdom.com:85';
const baseURL = 'https://'+baseIP+ '/apiCTI/api/'; 

@Injectable({
  providedIn: 'root'
})
export class CommonWebApiService {
    GetProcessInfo(CustomInsuranceUrl: any) {
      throw new Error('Method not implemented.');
    }

    constructor(private httpClient: HttpClient) { }

    GetBOGroupParent(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'GetBOGroupParent', data);
    }

    GetBusinessOutCome(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'GetProcessInfo', data);
    }

    GetBusinessOutcomeParent(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'GetBusinessOutcomeParent', data);
    }
    GetModes(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'GetModes', data);
    }

    GETHistoryDetails(url: any, data: any): Observable<any> {
      return this.httpClient.get(url + 'GETHistoryDetails?ani' + data + '&modeofcall=PredictiveOutbound');
    }
    GetScreenPopData(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'GetScreenPopData', data);
    }

    POSTInsertCallData(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + ' POSTInsertCallData', data);
    }
    POSTInsertOutcome(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'POSTInsertOutcome', data);
    }
    POSTInsertDNC(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'POSTInsertDNC', data);
    }
    POSTInsertCallBackData(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'POSTInsertCallBackData', data);
    }
    POSTInsertCallRemarks(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'POSTInsertCallRemarks', data);
    }
    SetBusinessOutcomeWithCallback(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'SetBusinessOutcomeWithCallback', data);
    }
    SetPersonalCallbackWithComments(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'SetPersonalCallbackWithComments', data);
    }
    SetBusinessOutcomeWithComments(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + ' SetBusinessOutcomeWithComments', data);
    }
    SetCallResults(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'SetCallResults', data);
    }

    SetAgentStatus(url: any, data: any): Observable<any> {
      return this.httpClient.post(url + 'SetAgentStatus', data);
    }
GETBranchNameDetails(url: any, data: any): Observable<any> {
  return this.httpClient.get(url + 'GETBranchNameDetails?ani'+ data );
}
POSTInsertSMSDetails(url: any, data: any): Observable<any> {
  return this.httpClient.post(url + 'POSTInsertSMSDetails', data);
}
sendSMS(url: any, data: any): Observable<any> {
  return this.httpClient.post(url + 'sendSMS', data);
}
GetWrapupCategoryDetails(url: any, data: any): Observable<any> {
  return this.httpClient.get(url + 'GetWrapupCategoryDetails?ani'+ data +'&process=Creditcard');
}
GetWrapupSubCategoryDetails(url: any, data: any,data1:any): Observable<any> {
  return this.httpClient.get(url + 'GetWrapupSubCategoryDetails?teamName='+ data +'&process=Creditcard' + data1);
}
POSTInsertAgentRemarks(url: any, data: any): Observable<any> {
  return this.httpClient.post(url + 'POSTInsertAgentRemarks', data);
}

}