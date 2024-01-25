import {EventEmitter} from "@angular/core";

export class AppDataService {
    AgentInfo: any=[];
    CallConnected = new EventEmitter(); 
    ConsultCallResp_Data:any;
    issurveyenable = false;
     
    
}