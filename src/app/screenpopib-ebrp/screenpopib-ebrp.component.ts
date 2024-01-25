import { Component } from '@angular/core';
import { CommonWebApiService } from '../common-web-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-screenpopib-ebrp',
  templateUrl: './screenpopib-ebrp.component.html',
  styleUrls: ['./screenpopib-ebrp.component.css']
})
export class ScreenpopibEbrpComponent {


  IsInbound = true;
   history:any;
   ScreenPopData:any;
   loginID='';
   agentname='';
   wrapup:any;
   selectedwrapup:any;
   agentRemarks='';
   isWrapupenable=true;
	loginExtenstion='';
  IsOutbound:any;
  IsPredictiveOutbound:any;  ScreeType:any;   errormessage:any;   receivedmessage:any   
  OutBoundPopData: any;
  label1:any;  label2:any;  label3:any;   label4:any;  label5:any;  label6:any;  label7:any;   label8:any;  label9:any;  label10:any;  label11:any;  label12:any;
  CallScreenData: any;
  isOutcomeEnable: any;
  isCBRemarks: any;
  uniqueId: any;
  callbackRemarks: any;
  BusOutcome: any;
  selectedoutCome: any;
  ParentBusOutcome: any;
  selectedParent: any;
  CBModes: any;
  selectedCBMode: any;
  CBTypes: any;  CBStartDate:any;  CBEndDate:any;
  selectedCBType: any; CBSPredtartDateOption:any;  CBPedStartDatePopup:any; OpenPredCBStartDate:any; CBPredStartDateOption:any; CBPredStartDatePopup:any;
  CBPreEndDateOption:any;  OpenPredCBEndDate:any; CBPredEndDatePopup:any; CBPredEndDateOption:any; CBEndDatePopup:any; xmlbusObj:any; xmlbusObj1:any;
  outcomeerror: any;
  cbflag: any;
  isValid: any; OutBoundPopData1:any;
  cberror: any;
  dates: any;

  constructor(private _httpClient:CommonWebApiService){
    console.log(window["config"]);
    this.CBTypes=window["config"].CBTypes;
    this.wrapup=window['config'].Wrapup;
    this.selectedwrapup = this.wrapup[0];
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
    }
  }

  generateUniquenum() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  }

  setDate () {
    // Start Date date configuration:
    
   var fromday = new Date();
    
   this.CBStartDate = fromday;
    
   this.CBEndDate = fromday;
    
   this.CBSPredtartDateOption = {
       timepickerOptions: { readonlyInput: false, showMeridian: false },
       datepickerOptions: {
           minDate: fromday,
           maxDate: null
       }
   };
    
   this.CBPedStartDatePopup = { opened: false };
    
   this.OpenPredCBStartDate = (e: any) => {
       var fromday = new Date();
    
       this.CBPredStartDateOption = {
           timepickerOptions: { readonlyInput: false, showMeridian: false },
           datepickerOptions: {
               minDate: fromday,
               maxDate: null
           }
       };
    
       e.preventDefault();
       e.stopPropagation();
    
       this.CBPredStartDatePopup.opened = true;
   };
    
   // End Date date configuration:
    
   var today = new Date();
    
   this.CBPreEndDateOption = {
       timepickerOptions: { readonlyInput: false, showMeridian: false },
       datepickerOptions: {
           minDate: today,
           maxDate: null
       }
   };
    
   this.CBPredEndDatePopup = { opened: false };
    
   this.OpenPredCBEndDate = (e: any) => {
       this.CBPredEndDateOption = {
           timepickerOptions: { readonlyInput: false, showMeridian: false },
           datepickerOptions: {
               minDate: today,
               maxDate: null
           }
       };
    
       e.preventDefault();
       e.stopPropagation();
    
       this.CBEndDatePopup.opened = true;
   };
   
   };



  public receiveMessage(event: any): void {

    try {
      if (event.data != undefined && event.data != '') {
        //alert(event.data);

        //debugger;
         console.log('event.data:custom app ***************');
        // console.log(event.data);
        this.receivedmessage = JSON.parse(event.data);

        console.log(this.receivedmessage.type);
        switch (this.receivedmessage.type) {
              
          case 'CallData': {
            /*Load agent information from finesse */ 
            let calldata =this.receivedmessage;// JSON.parse(this.receivedmessage.data);
            if (calldata.type == "OnBeginCall") {
              this.IsInbound = true;
              var _language='';				
         
              switch (calldata.Callvariables.callVariable3) {
                     case 'ENG':
                      _language='ENGLISH';
                     break;
                     case 'HIN':
                        _language='HINDI';
                     break;
                     case 'PUN':
                         _language='PUNJABI';
                     break;
                     case 'MAR':
                         _language='MARATHI';
                     break;
                     case 'RAJ':
                        _language='RAJASTHANI';
                     break;
                     case 'GUJ':
                         _language='GUJARATI';
                     break;
                     default:

              }

//  var obj=$filter('filter')(window["config"].MenuMaster, function (d:any) {return d.id === calldata.Callvariables.callVariable4;})[0];

          this.isWrapupenable=false;
             var ScreenPopData = {
                 ANI: calldata.Callvariables.callVariable1,
                 RegisterNo: calldata.Callvariables.callVariable2,
                 LastMenu:'NA',
     //LastMenu:calldata.Callvariables.callVariable4,
                 Language: _language,
                 SkillName :calldata.Callvariables.callVariable5,
                 CallKey:calldata.Callvariables.callVariable6,
                 CustomerID:calldata.Callvariables.callVariable7
             };
             
           

            
             this.ScreenPopData= ScreenPopData;
             this.ScreeType='INBOUND';
            
            
             this.IsInbound = true;
             this.IsOutbound = false;
             this.IsPredictiveOutbound = false;
             
            //if(ScreenPopData.RegisterNo !='NA')
    if(ScreenPopData.ANI !='NA')
    {
             //httpService.httpRequest('GET',config.CustomApiUrl+'GETHistoryDetails?registerMobNo='+ScreenPopData.RegisterNo,'')

             this._httpClient.GETHistoryDetails(window['config'].CustomApiUrl,ScreenPopData.ANI).subscribe({
              next: (Res: any) => {
                console.log("api response", Res);
                this.history = Res.data;       
                                          
              },
              error: (err: any) => {
                
                this.errormessage = 'Unable to load History data: ' + err.message;
               console.log(this.errormessage, err);
              }
            });
   /*----------httpService.httpRequest('GET',config.CustomApiUrl+'GETHistoryDetails?registerMobNo='+ScreenPopData.ANI,'')
                     .then(function (val:any) {
                     this.history = val.data;
                     
                ;
                     },function (error:any) {
                     this.errormessage = 'Unable to load History data: ' + error.message;
                     }); -----------*/
            }
                 var callRemarks={ANI:ScreenPopData.ANI,
                 RegisterMobNo:ScreenPopData.RegisterNo,
                 LastMenu:ScreenPopData.LastMenu,
                 Language:ScreenPopData.Language,
                 CustomerID:ScreenPopData.CustomerID,
                 CallKey:ScreenPopData.CallKey,
                 SkillGroup:ScreenPopData.SkillName,
                 AgentID:this.loginID,
                 AgentName:this.agentname,
     Ext : this.loginExtenstion
     }   

     this._httpClient.POSTInsertCallRemarks(window['config'].CustomApiUrl,callRemarks).subscribe({
      next: (Res: any) => {
        console.log("api response", Res);
                            
                
      },
      error: (err: any) => {
        
        this.errormessage = 'Unable to insert calldata: ' + err.message;
       console.log(this.errormessage, err);
      }
    });
                   
             /*----------- httpService.httpRequest('POST',config.CustomApiUrl+'POSTInsertCallRemarks',callRemarks)
                 .then(function (val) {
                
                 },function (error) {
                 this.errormessage = 'Unable to insert calldata: ' + error.message;
                 });--------*/
                 
         }
             
            
            break;
          }
          case 'UserData': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
              
            this.receiveMessage = JSON.parse(event.data);
            if (calldata.state == "NOT_READY" || calldata.state == "READY") {
                this.isWrapupenable=true;
                  this.agentRemarks='';
                    this.errormessage = '';
                    this.ScreenPopData= {};
                    this.ScreeType='';
                    this.agentname=calldata.agentName
                    this.loginID=calldata.agentID;
        this.loginExtenstion= calldata.Extension;
                        
            }

            break;
          }
          case 'OutboundEndData': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
              
             calldata = JSON.parse(event.data);
            if (calldata.type == "OnEndCall") {
                //update call data datetime in to custom db
                if (this.OutBoundPopData != null && this.OutBoundPopData != undefined) {
                    this.InsertCallDetails();
                }
            }
     
    

            break;
          }
          case 'PredictiveOutboundData': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
              
           
               calldata = JSON.parse(event.data);

              if (calldata.Callvariables.BACampaign.indexOf("Coll") !== -1) {

                  this.label1 = "ANI";
                  this.label2 = "Loan Number";
                  this.label3 = "Customer Name";
                  this.label4 = "Address";
                  this.label5 = "CYC Date";
                  this.label6 = "POS";
                  this.label7 = "Overdue Amount ";
                  this.label8 = "Branch";
                  this.label9 = "Monthly Installment";
                  this.label10 = "Vehicle Model";
                  this.label11 = "Vehicle Number";
                  this.label12 = "Mode of Payment";
              }
              else if ((calldata.Callvariables.BACampaign.indexOf("Sales") !== -1) ||
                  (calldata.Callvariables.BACampaign.indexOf("Marketing") !== -1)) {

                  this.label1 = "ANI";
                  this.label2 = "Campaign Name";
                  this.label3 = "Loan Number";
                  this.label4 = "Customer Name";
                  this.label5 = "Branch";
                  this.label6 = "RO Name";
                  this.label7 = "RO Employee code";
                  this.label8 = "Loan Amount Offer";
                  this.label9 = "Product";
                  this.label10 = "Sub Product";
                  this.label11 = "Alternate Number";
                  this.label12 = "Comments";

              }


              if (calldata.type == "OnPredictiveOutboundCall") {


                  setTimeout(()=> {
                     this.IsInbound = false;
                     this.IsOutbound = false;
                     this.IsPredictiveOutbound = true;
                     this.ScreeType = 'OUTBOUND PREDECTIVE';
                      this.isOutcomeEnable = false;
                      this.isCBRemarks = true;
                  }, 10);

                  //set currentdate
                  this.setDate();

                  var OutBoundPopData1 = {
                      Callerid11: calldata.Callvariables.dialedNumber,
                      CampaignName: calldata.Callvariables.BACampaign,
                      CustomerName: calldata.Callvariables.BABuddyName.split(",")[0],
                      LeadID: calldata.Callvariables.BABuddyName.split(",")[1],
                      BAAccountNumber: calldata.Callvariables.BAAccountNumber,
                      BABuddyName: calldata.Callvariables.BABuddyName
                  };

                 
                      this.CallScreenData = OutBoundPopData1;
                 

                  if (calldata.Callvariables.BAStatus == "OUTBOUND"  || calldata.Callvariables.BAStatus == "PREDICTIVE_OUTBOUND"  && calldata.Callvariables.BAResponse != 'Accept') {
                      /* Generate guid - uniquenumber*/
                      var uniquenumber = this.generateUniquenum();
                      this.uniqueId = uniquenumber;


                      if (this.CallScreenData.BAAccountNumber != null) {
                          /* GET Parent Group Outcome*/
                          this.getParentOutcome(this.CallScreenData.BAAccountNumber);
                          /*Get All Business outcome*/
                          this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
                          /* Get call back modes */
                          this.getModes(this.CallScreenData.BAAccountNumber);
                          /* Get Screen pop data*/
                          this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
                              this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
                              this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
                      }


                      /* Get Call History- Calls made for specific contact by dialednumber*/
                      /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
                          this.loadhistory(this.CallScreenData.Callerid11);
                      }*/
                  }



              }
          
     
    

            break;
          }

          case 'UserData': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
              
           
               calldata = JSON.parse(event.data);
             this.agentname = calldata.agentName
             this.loginID = calldata.agentID;
             this.loginExtenstion = calldata.Extension;

              if (calldata.state == "NOT_READY" || calldata.state == "READY") {
               
                     this.OutBoundPopData = {};
                     this.isOutcomeEnable = true;
                


                  // -------resetting values---- //
                 this.setDate();

                 

                 this.callbackRemarks = "";
                 this.agentRemarks = "";
                  if (this.BusOutcome != null &&this.BusOutcome != undefined) {
                     this.selectedoutCome =this.BusOutcome[0];
                  }
                  if (this.ParentBusOutcome != null &&this.ParentBusOutcome != undefined) {
                     this.selectedParent =this.ParentBusOutcome[0];
                  }
                  if (this.CBModes != null &&this.CBModes != undefined) {
                     this.selectedCBMode =this.CBModes[0];
                  }
                  if (this.CBTypes != null &&this.CBTypes != undefined) {
                     this.selectedCBType =this.CBTypes[0];
                  }
              }
         
     
    

            break;
          }
          case 'ANIPreviewOutBound': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
             calldata = JSON.parse(event.data);
            if (calldata.type == "CallerIDForPreviewOutBound") {
                let OutBoundPopData1 = {
                    Callerid11: calldata.CallerID
                };
              
                    this.OutBoundPopData = this.OutBoundPopData1;
              
            }
      
     
    

            break;
          }
          case 'GetDPACCEPTCallValues': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
             calldata = JSON.parse(event.data);


            break;
          }
          case 'OutboundEndData': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
            calldata = JSON.parse(event.data);
            if (calldata.type == "OnEndCall") {
                //update call data datetime in to custom db
                if (this.OutBoundPopData != null &&this.OutBoundPopData != undefined) {
                   this.InsertCallDetails();
                }
            }
      
     
    

            break;
          }
          case 'OutboundData': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
           

             
                 this.IsInbound = false;
                 this.IsOutbound = true;
                 this.IsPredictiveOutbound = false;
                 this.isOutcomeEnable = false;
                 this.isCBRemarks = true;
                 this.ScreeType = "OUTBOUND PREVIEW";
                  var today = new Date();
                 this.CBEndDate = today;
                 this.CBStartDate = today;
             

              calldata = JSON.parse(event.data);
              if (calldata.Callvariables.BACampaign.indexOf("Coll") !== -1) {

                 this.label1 = "ANI";
                 this.label2 = "Loan Number";
                 this.label3 = "Customer Name";
                 this.label4 = "Address";
                 this.label5 = "CYC Date";
                 this.label6 = "POS";
                 this.label7 = "Overdue Amount ";
                 this.label8 = "Branch";
                 this.label9 = "Monthly Installment";
                 this.label10 = "Vehicle Model";
                 this.label11 = "Vehicle Number";
                 this.label12 = "Mode of Payment";
                  
              }
              else if ((calldata.Callvariables.BACampaign.indexOf("Sales") !== -1) ||
                  (calldata.Callvariables.BACampaign.indexOf("Marketing") !== -1)) {

                 this.label1 = "ANI";
                 this.label2 = "Campaign Name";
                 this.label3 = "Loan Number";
                 this.label4 = "Customer Name";
                 this.label5 = "Branch";
                 this.label6 = "RO Name";
                 this.label7 = "RO Employee code";
                 this.label8 = "Loan Amount Offer";
                 this.label9 = "Product";
                 this.label10 = "Sub Product";
                 this.label11 = "Alternate Number";
                 this.label12 = "Comments";
              }


              var OutBoundPopData1 = {
                  Callerid11: calldata.Callvariables.dialedNumber,
                  CampaignName: calldata.Callvariables.BACampaign,
                  CustomerName: calldata.Callvariables.BABuddyName.split(",")[0],
                  LeadID: calldata.Callvariables.BABuddyName.split(",")[1],
                  BAAccountNumber: calldata.Callvariables.BAAccountNumber,
                  BABuddyName: calldata.Callvariables.BABuddyName
              };


           
                 this.CallScreenData = OutBoundPopData1;
             


              if (calldata.Callvariables.BAStatus == "PREVIEW_OUTBOUND_RESERVATION"
                  && calldata.Callvariables.BAResponse != 'Accept') {
                  /* Generate guid - uniquenumber*/
                  var uniquenumber = this.generateUniquenum();
                 this.uniqueId = uniquenumber;


                  if (this.CallScreenData.BAAccountNumber != null) {
                      /* GET Parent Group Outcome*/
                     this.getParentOutcome(this.CallScreenData.BAAccountNumber);
                      /*Get All Business outcome*/
                     this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
                      /* Get call back modes */
                     this.getModes(this.CallScreenData.BAAccountNumber);
                      /* Get Screen pop data*/
                     this.loadScreenpopdata(this.CallScreenData.CampaignName,this.CallScreenData.CustomerName,
                         this.CallScreenData.LeadID,this.CallScreenData.BAAccountNumber,
                         this.CallScreenData.Callerid11,this.CallScreenData.BABuddyName);
                  }


                  /* Get Call History- Calls made for specific contact by dialednumber*/
                  /*if ($scope.CallScreenData.Callerid11 != 'NA' &&this.CallScreenData.Callerid11 != null) {
                     this.loadhistory($scope.CallScreenData.Callerid11);
                  }*/
              }

              else if (calldata.Callvariables.BAStatus == "DIRECT_PREVIEW_OUTBOUND_RESERVATION"
                  && calldata.Callvariables.BAResponse ==null) {
                  /* Generate guid - uniquenumber*/
                  var uniquenumber = this.generateUniquenum();
                 this.uniqueId = uniquenumber;


                  if (this.CallScreenData.BAAccountNumber != null) {
                      /* GET Parent Group Outcome*/
                     this.getParentOutcome(this.CallScreenData.BAAccountNumber);
                      /*Get All Business outcome*/
                     this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
                      /* Get call back modes */
                     this.getModes(this.CallScreenData.BAAccountNumber);
                      /* Get Screen pop data*/
                     this.loadScreenpopdata(this.CallScreenData.CampaignName,this.CallScreenData.CustomerName,
                         this.CallScreenData.LeadID,this.CallScreenData.BAAccountNumber,
                         this.CallScreenData.Callerid11,this.CallScreenData.BABuddyName);
                  }


                  /* Get Call History- Calls made for specific contact by dialednumber*/
                  /*if ($scope.CallScreenData.Callerid11 != 'NA' &&this.CallScreenData.Callerid11 != null) {
                     this.loadhistory($scope.CallScreenData.Callerid11);
                  }*/
              }

    

            break;
          }
          case 'GetDPOffercallValues': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
              
             calldata = JSON.parse(event.data);
     
    

            break;
          }
          case 'UserLoad': {
            debugger;
            // this.appService.LoadAgentDetails(this.receivedmessage)
            let calldata =this.receivedmessage;
           
               calldata = JSON.parse(event.data);
             this.agentname = calldata.agentName
             this.loginID = calldata.agentID;
             this.loginExtenstion = calldata.Extension;
              if (calldata.state == "NOT_READY" || calldata.state == "READY") {
                 
                     this.OutBoundPopData = {};
                     this.isOutcomeEnable = true;
                      //$rootScope.IsOutbound = false;
                      //$rootScope.IsInbound = false;
                      //$rootScope.IsPredictiveOutbound = false;
                


                  // -------resetting values---- //
                  var today = new Date();
                 this.CBEndDate = today;
                 this.CBStartDate = today;
                 


                 this.callbackRemarks = "";
                 this.agentRemarks = "";
                  if (this.BusOutcome != null &&this.BusOutcome != undefined) {
                     this.selectedoutCome =this.BusOutcome[0];
                  }
                  if (this.ParentBusOutcome != null &&this.ParentBusOutcome != undefined) {
                     this.selectedParent =this.ParentBusOutcome[0];
                  }
                  if (this.CBModes != null &&this.CBModes != undefined) {
                     this.selectedCBMode =this.CBModes[0];
                  }
                  if (this.CBTypes != null &&this.CBTypes != undefined) {
                     this.selectedCBType =this.CBTypes[0];
                  }



              }
         
      
     
    

            break;
          }

          default:
            break;
        }

        (<any>window).top.postMessage("success", "*");
      }

     
    }
    catch (e) {
      console.error(e);
    }
  }

  submit() {

    if(this.selectedwrapup.id =='00'){
       this.errormessage='Select wrapup';
            return;
    }else{
       this.errormessage='';
    }
    var wrapup={AgentRemarks:this.agentRemarks,
        WrapString:this.selectedwrapup.description,
        WrapCode:this.selectedwrapup.id,
        CallID:this.ScreenPopData.CallKey,
        RegisterMobNo:this.ScreenPopData.RegisterNo,
        AgentID:this.loginID,
        AgentName:this.agentname

    }

    this._httpClient.POSTInsertAgentRemarks(window['config'].CustomApiUrl,wrapup).subscribe({
      next: (Res: any) => {
        console.log("api response", Res);
                 
        this.errormessage="Wrapup Added successfully";
        this.selectedwrapup= this.wrapup[0];
        this.agentRemarks='';           
                
      },
      error: (err: any) => {
        
        this.errormessage = 'Unable to insert Wrapup data: ' + err.message;
       console.log(this.errormessage, err);
      }
    });
  /*-------- httpService.httpRequest('POST',config.CustomApiUrl+"POSTInsertAgentRemarks",wrapup)
                .then(function (val) {
               this.errormessage="Wrapup Added successfully";
                this.selectedwrapup= this.wrapup[0];
                this.agentRemarks='';
                },function (error) {
               this.errormessage = 'Unable to insert Wrapup data: ' + error.message;
                }); -----------*/
}

getParentOutcome (BAAccountNumber:any) {
  this._httpClient.GetBOGroupParent(window['config'].LCMURL,JSON.stringify({ AccountNumber: BAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }
    var busObj :any;
    busObj = Res.data.d;
    busObj.splice(0, 0, { ParentId: "0", ParentName: "None" });

    setTimeout(() => {
       this.ParentBusOutcome = busObj;
       this.selectedParent =this.ParentBusOutcome[0];
      //  this.$apply();
    }, 10);       
                     
    },
    error: (err: any) => {   
      this.errormessage = 'Unable to load Parent-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
}

getAllBusinessOutcome(BAAccountNumber:any) {
  this._httpClient.GetBusinessOutCome(window['config'].LCMURL,JSON.stringify({ AccountNumber: BAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }

    var busObj:any;
    busObj = Res.data.d;
    busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

    setTimeout(()=> {
       this.BusOutcome = busObj;
       this.selectedoutCome =this.BusOutcome[0];
      //  this.$apply();
    }, 10);           
          
    },
    error: (err: any) => {
      this.errormessage = 'Unable to load Business-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
}

getOutcome() {
  if (this.selectedParent.ParentId == "0") {
    return;
}
var inParam = JSON.stringify({ AccountNumber:this.OutBoundPopData.BAAccountNumber, ParentBusinessOutcomeId:this.selectedParent.ParentId });
this._httpClient.GetBusinessOutcomeParent(window['config'].LCMURL,inParam).subscribe({
  next: (Res: any) => {
    console.log("api response", Res);
    if (!Res.data) {
      return;
  }
  var busObj :any;
  busObj = Res.data.d;
  busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

  setTimeout(()=> {
     this.BusOutcome = busObj;
     this.selectedoutCome =this.BusOutcome[0];
    //  this.$apply();

  }, 10);          
           
  },
  error: (err: any) => {
    
    this.errormessage = 'Unable to load parent based Business-Outcome: ' + err.message;
   console.log(this.errormessage, err);
  }
});
}
enableremarks () {
  this.isCBRemarks = false;
}
getModes(BAAccountNumber:any) {
  var inParam = JSON.stringify({ AccountNumber: BAAccountNumber });
  this._httpClient.GetModes(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
               
      if (!Res.data) {
        return;
    }
    var busObj :any;
    busObj = Res.data.d;
    busObj.splice(0, 0, { ModeID: "0", Description: "None" });

    setTimeout( ()=> {
       this.CBModes = busObj;
       this.selectedCBMode =this.CBModes[0];
      //  this.$apply();

    }, 10);
              
              
    },
    error: (err: any) => {
      
      this.errormessage = '';
     console.log(this.errormessage, err);
    }
  });
}
loadhistory (ani:any) {
  this._httpClient.GETHistoryDetails(window['config'].CustomApiUrl,ani +'&modeofcall=PredictiveOutbound').subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
     this.history = Res.data;                  
              
    },
    error: (err: any) => {
      
      this.errormessage = 'Unable to load History data: ' + err.message;
     console.log(this.errormessage, err);
    }
  });

}
loadScreenpopdata (campaignName:any, customerName:any, leadID:any, bAAccountNumber:any, dialednumber:any, babuddyname:any) {
  this._httpClient.GetScreenPopData(window['config'].LCMURL,JSON.stringify({ AccountNumber: bAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
               
      if (!Res.data) {
        return;
    }

    var busObj :any;
    this.xmlbusObj = Res.data.d;
    this.xmlbusObj1 = this.xmlbusObj.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
    var replaceamp=this.xmlbusObj1.replace('&', '');
//     var x2js = new X2JS();
// busObj = x2js.xml_str2json(replaceamp);
    //busObj = x2js.xml_str2json(xmlbusObj1);

    /*
    var OutBoundPopData1 = {
        CampaignName: campaignName == undefined ? "" : campaignName,
        BACustomerName: customerName == undefined ? "" : customerName,
        BALeadID: leadID == undefined ? "" : leadID,
        BAAccountNumber: bAAccountNumber == undefined ? "" : bAAccountNumber,
        BABuddyName: babuddyname == undefined ? "" : babuddyname,
        LeadID: busObj.Data.Lead_Id == undefined ? "" : busObj.Data.Lead_Id,
        Callerid11: dialednumber == undefined ? "" : dialednumber,
        MobileNumber: busObj.Data.Mobile_Number == undefined ? "" : busObj.Data.Mobile_Number,
        LoanNumber: busObj.Data.Loan_account_number == undefined ? "" : busObj.Data.Loan_account_number,
        CustomerName: busObj.Data.Customer_Name == undefined ? "" : busObj.Data.Customer_Name,
        Address: busObj.Data.Address == undefined ? "" : busObj.Data.Address,
        DueDate: busObj.Data.CYC_Date == undefined ? "" : busObj.Data.CYC_Date,
        DPD: busObj.Data.Overdue == undefined ? "" : busObj.Data.Overdue,
        Branch: busObj.Data.Region == undefined ? "" : busObj.Data.Region,
        EMIAmount: busObj.Data.Monthly_installments == undefined ? "" : busObj.Data.Monthly_installments,
        DueEMICount: busObj.Data.vehicle_model == undefined ? "" : busObj.Data.vehicle_model,
        VechileNumber: busObj.Data.Vehicle_Num == undefined ? "" : busObj.Data.Vehicle_Num,
        UniqueNumber:this.uniqueId == undefined ? "" :this.uniqueId,
        AgentID:this.loginID == undefined ? "" :this.loginID,
        AgentName:this.agentname == undefined ? "" :this.agentname,
        Extension:this.loginExtenstion == undefined ? "" :this.loginExtenstion

    };
    */



    if (campaignName.indexOf("Coll") !== -1) {

        var OutBoundPopData1 = {
            CampaignName: campaignName == undefined ? "" : campaignName,
            BACustomerName: customerName == undefined ? "" : customerName,
            BALeadID: leadID == undefined ? "" : leadID,
            BAAccountNumber: bAAccountNumber == undefined ? "" : bAAccountNumber,
            BABuddyName: babuddyname == undefined ? "" : babuddyname,
            LeadID: busObj.Data.Lead_Id == undefined ? "" : busObj.Data.Lead_Id,
            Callerid11: dialednumber == undefined ? "" : dialednumber,
            label1: busObj.Data.Mobile_Number == undefined ? "" : busObj.Data.Mobile_Number,
            label2: busObj.Data.Loan_account_number == undefined ? "" : busObj.Data.Loan_account_number,
            label3: busObj.Data.Customer_Name == undefined ? "" : busObj.Data.Customer_Name,
            label4: busObj.Data.Address == undefined ? "" : busObj.Data.Address,
            label5: busObj.Data.CYC_Date == undefined ? "" : busObj.Data.CYC_Date,
            label6: busObj.Data.Total_pos == undefined ? "" : busObj.Data.Total_pos,
            label7: busObj.Data.Overdue == undefined ? "" : busObj.Data.Overdue,
            label8: busObj.Data.Region == undefined ? "" : busObj.Data.Region,
            label9: busObj.Data.Monthly_installments == undefined ? "" : busObj.Data.Monthly_installments,
            label10: busObj.Data.vehicle_model == undefined ? "" : busObj.Data.vehicle_model,
            label11: busObj.Data.Vehicle_Num == undefined ? "" : busObj.Data.Vehicle_Num,
            label12: busObj.Data.Mode == undefined ? "" : busObj.Data.Mode,
            UniqueNumber:this.uniqueId == undefined ? "" :this.uniqueId,
            AgentID:this.loginID == undefined ? "" :this.loginID,
            AgentName:this.agentname == undefined ? "" :this.agentname,
            Extension:this.loginExtenstion == undefined ? "" :this.loginExtenstion
        };
       this.OutBoundPopData = OutBoundPopData1;
    }
    else if ((campaignName.indexOf("Sales") !== -1) || (campaignName.indexOf("Marketing") !== -1)) {
        var OutBoundPopData1 = {
            CampaignName: campaignName == undefined ? "" : campaignName,
            label2: campaignName == undefined ? "" : campaignName,
            BACustomerName: customerName == undefined ? "" : customerName,
            BALeadID: leadID == undefined ? "" : leadID,
            BAAccountNumber: bAAccountNumber == undefined ? "" : bAAccountNumber,
            BABuddyName: babuddyname == undefined ? "" : babuddyname,
            LeadID: busObj.Data.Lead_Id == undefined ? "" : busObj.Data.Lead_Id,
            Callerid11: dialednumber == undefined ? "" : dialednumber,
            label1: busObj.Data.Mobile_Number == undefined ? "" : busObj.Data.Mobile_Number,
            label3: busObj.Data.Loan_account_number == undefined ? "" : busObj.Data.Loan_account_number,
            label4: busObj.Data.Customer_Name == undefined ? "" : busObj.Data.Customer_Name,
            label5: busObj.Data.Region == undefined ? "" : busObj.Data.Region,
            label6: busObj.Data.RO_Name == undefined ? "" : busObj.Data.RO_Name,
            label7: busObj.Data.RO_Emp_Code == undefined ? "" : busObj.Data.RO_Emp_Code,
            label8: busObj.Data.Loan_Amount == undefined ? "" : busObj.Data.Loan_Amount,
            label9: busObj.Data.Product == undefined ? "" : busObj.Data.Product,
            label10: busObj.Data.Sub_Product == undefined ? "" : busObj.Data.Sub_Product,
            label11: busObj.Data.Other_Alternate_Number == undefined ? "" : busObj.Data.Other_Alternate_Number,
            label12: busObj.Data.comments == undefined ? "" : busObj.Data.comments, 
            UniqueNumber:this.uniqueId == undefined ? "" :this.uniqueId,
            AgentID:this.loginID == undefined ? "" :this.loginID,
            AgentName:this.agentname == undefined ? "" :this.agentname,
            Extension:this.loginExtenstion == undefined ? "" :this.loginExtenstion
        };
       this.OutBoundPopData = OutBoundPopData1;
    }


    //console.log(busObj);
   this.OutBoundPopData = this.OutBoundPopData1;

    /*
setTimeout(function () {
   this.OutBoundPopData = OutBoundPopData1;
   this.$apply();
}, 10);
    */

    //insert call data in to custom db
    if (this.OutBoundPopData != null &&this.OutBoundPopData != undefined) {
       this.InsertCallDetails();
    }

    /* Get Call History- Calls made for specific contact by mobile number*/
    if (this.OutBoundPopData.label1 != 'NA' &&this.OutBoundPopData.label1 != null) {
       this.loadhistory(this.OutBoundPopData.label1);
    }
              
              
    },
    error: (err: any) => {
      
      this.errormessage = 'Unable to load ScreenpopData: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
}
InsertCallDetails() {
  if (this.OutBoundPopData.UniqueNumber != null) {
    var incalldataParam = JSON.stringify({
        AgentID: this.OutBoundPopData.AgentID == undefined ? "" : this.OutBoundPopData.AgentID,
        AgentName: this.OutBoundPopData.AgentName == undefined ? "" : this.OutBoundPopData.AgentName,
        UniqueCallId: this.OutBoundPopData.UniqueNumber == undefined ? "" : this.OutBoundPopData.UniqueNumber,
        CampaignName: this.OutBoundPopData.CampaignName == undefined ? "" : this.OutBoundPopData.CampaignName,
        BAAccountNumber: this.OutBoundPopData.BAAccountNumber == undefined ? "" : this.OutBoundPopData.BAAccountNumber,
        BABuddyName: this.OutBoundPopData.BABuddyName == undefined ? "" : this.OutBoundPopData.BABuddyName,
        OBCallData: this.xmlbusObj,
        ANI: this.OutBoundPopData.label1 == undefined ? "" : this.OutBoundPopData.label1,
        DialedNumber: this.OutBoundPopData.Callerid11 == undefined ? "" : this.OutBoundPopData.Callerid11,
        Extension: this.OutBoundPopData.Extension == undefined ? "" : this.OutBoundPopData.Extension,
        ModeOfCall: "PredictiveOutbound",
        LeadID: this.OutBoundPopData.BALeadID == undefined ? "" : this.OutBoundPopData.BALeadID
    });
    this._httpClient.POSTInsertCallData(window['config'].LCMURL,incalldataParam).subscribe({
      next: (Res: any) => {
        console.log("api response", Res);
                 
        console.log(Res);
        this.errormessage = "Call Data Added successfully";  
      },
      error: (err: any) => {
        
        this.errormessage = 'Unable to insert call data: ' + err.message;
       console.log(this.errormessage, err);
      }
    });
   
}
else {
    this.errormessage ="Unique Number is empty";
  }

}

setOutcome() {
  try {
      if (this.selectedoutCome == null && this.selectedoutCome == undefined) {
          this.outcomeerror = "Select Business-Outcome";
          return;
      }
      if (this.agentRemarks == null || this.agentRemarks == undefined || this.agentRemarks == "") {
          this.outcomeerror = "Agent Remarks should not empty";
          return;
      }
      if (this.selectedoutCome != null) {
          if (this.selectedoutCome.OutComeID == "0") {
              this.outcomeerror = "Select Business-Outcome";
              return;
          }
      }


      var inOutParam = JSON.stringify({
          UniqueCallId: this.OutBoundPopData.UniqueNumber,
          BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
          ParentOutcome: this.selectedParent.ParentId,
          ParentOutcomeDesc: this.selectedParent.ParentName,
          BusinessOutcome: this.selectedoutCome.OutComeID,
          BusinessOutcomeDesc: this.selectedoutCome.Description,
          DNCInfo: "",
          CallID: "", UserID: this.OutBoundPopData.AgentID,
          AgentRemarks: this.agentRemarks, TargetAmount: 0,
          ModeOfCall: "PredictiveOutbound",
          Ani: this.OutBoundPopData.label1,
          AgentID: this.OutBoundPopData.AgentID,
          AgentName: this.OutBoundPopData.AgentName,
          CampaignName: this.OutBoundPopData.CampaignName,

      });

      //insert outcome data in to custom db
       this._httpClient.POSTInsertOutcome(window['config'].CustomOBApiUrl,inOutParam).subscribe({
            next: (Res: any) => {
              console.log("api response", Res);       
                      
            },
            error: (err: any) => {
              
              this.errormessage = '';
             console.log(this.errormessage, err);
            }
          });


      if (this.cbflag == false) {
          var inParam = JSON.stringify({ AccountNumber: this.OutBoundPopData.BAAccountNumber, Outcome: this.selectedoutCome.OutComeID, CallID: "", UserID: "", AgentComment: this.agentRemarks, TargetAmount: 0 });
          this._httpClient.SetBusinessOutcomeWithComments(window['config'].CustomInsuranceUrl,inParam).subscribe({
            next: (Res: any) => {
              console.log("api response", Res);
              if (!Res.data) {
                return;
            }
            if (Res.data.d == true) {
                this.outcomeerror = "Business-Outcome configured successfully";
                this.selectedoutCome = this.BusOutcome[0];
                this.selectedParent = this.ParentBusOutcome[0];
                this.agentRemarks = "";

            }
            else {
                this.errormessage = '';
                this.selectedoutCome = this.BusOutcome[0];
                this.selectedParent = this.ParentBusOutcome[0];
                this.agentRemarks = "";
            }   
            this.cbflag = false;

            (error:any)=> {
              this.outcomeerror = 'Unable to updated Business-Outcome: ' + error.message;
              this.selectedoutCome = this.BusOutcome[0];
              this.selectedParent = this.ParentBusOutcome[0];
              this.agentRemarks = "";
          } 
                       
            },
            
            error: (err: any) => { 
              this.errormessage = '';
             console.log(this.errormessage, err);
            }
          });

                  
      }
      else {
        this.outcomeerror = "Business-Outcome configured successfully";
        this.selectedoutCome = this.BusOutcome[0];
        this.selectedParent = this.ParentBusOutcome[0];
        this.agentRemarks = "";
    }
    
  }
  catch (ex) {
      this.outcomeerror = ex;
  }

}

setDNC () {

  try {

      if (this.agentRemarks == null || this.agentRemarks == undefined || this.agentRemarks == "") {
          this.outcomeerror = "Agent Remarks should not empty";
          return;
      }
      var inOutParam = JSON.stringify({
          UniqueCallId: this.OutBoundPopData.UniqueNumber,
          BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
          CampaignName: this.OutBoundPopData.CampaignName,
          OutcomeId: "5",
          DncInfo: ",",
          CallID: "", UserID: this.OutBoundPopData.AgentID,
          ModeOfCall: "PredictiveOutbound",
          Ani: this.OutBoundPopData.label1,
          AgentID: this.OutBoundPopData.AgentID,
          AgentName: this.OutBoundPopData.AgentName,
          AgentRemarks: this.agentRemarks, TargetAmount: 0
      });

      //insert outcome data in to custom db
    
          this._httpClient. POSTInsertDNC(window['config'].CustomOBApiUrl,inOutParam).subscribe({
            next: (Res: any) => {
              console.log("api response", Res);
                                          
            },
            error: (err: any) => {
              
              this.errormessage = '';
             console.log(this.errormessage, err);
            }
          });    

      var inParam = JSON.stringify({
          AccountNumber: this.OutBoundPopData.BAAccountNumber, Outcome: "5",
          DNCInfo: ",", CallID: this.OutBoundPopData.UniqueNumber, UserID: this.OutBoundPopData.AgentID, AgentComment: this.agentRemarks, TargetAmount: 0
      });
      this._httpClient.SetCallOutcome(window['config'].LCMURL,inParam).subscribe({
        next: (Res: any) => {
          console.log("api response", Res);
          if (!Res.data) {
            return;
        }
        this.outcomeerror = "DNC outcome successfully updated";
        this.agentRemarks = "";        
 	
                                
        },
        error: (err: any) => {
          
          this.errormessage = 'Unable to updated DNC-Outcome: ' + err.message;
         console.log(this.errormessage, err);
        }
      });

  }
  catch (ex) {
      this.outcomeerror = ex;
  }


}

setCallback () {

  try {
      this.IsValidInputs();
      if (this.isValid == true) {
          if (this.selectedCBType.id == "1") {

              //invoking SetCallbackWithComments
              var cbStTime = moment(this.CBStartDate).format('HH:mm:ss');
              var cbStDate = moment(this.CBStartDate).format('DD/MM/YYYY');

              var cbStDateTime = moment(this.CBStartDate).format('DD/MM/YYYY HH:mm');

              var cbEndTime = moment(this.CBEndDate).format('HH:mm:ss');
              var cbEndDate = moment(this.CBEndDate).format('DD/MM/YYYY');

              var cbEndDateTime = moment(this.CBEndDate).format('DD/MM/YYYY HH:mm');

              var inCBParam = JSON.stringify({
                  UniqueCallId: this.OutBoundPopData.UniqueNumber,
                  BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
                  CBStDateTime: cbStDateTime,
                  CBEndDateTime: cbEndDateTime,
                  ModeID: this.selectedCBMode.ModeID,
                  CallID: "",
                  UserID: this.OutBoundPopData.AgentID,
                  CBType: this.selectedCBType.Description,
                  ModeOfCall: "PredictiveOutbound",
                  Ani: this.OutBoundPopData.label1,
                  AgentID: this.OutBoundPopData.AgentID,
                  AgentName: this.OutBoundPopData.AgentName,
                  CampaignName: this.OutBoundPopData.CampaignName,
                  AgentRemarks: this.callbackRemarks,
                  TargetAmount: 0,
                  ModeDescription: this.selectedCBMode.Description,
                  CBStDate: cbStDate,
                  CBEndDate: cbEndDate,
                  CBStTime: cbStTime,
                  CBEndTime: cbEndTime
              });

              //insert call back data to custom db
                  this._httpClient.POSTInsertCallBackData(window['config'].CustomOBApiUrl,inCBParam).subscribe({
                    next: (Res: any) => {
                      console.log("api response", Res);
                                             
                              
                    },
                    error: (err: any) => {
                      
                      this.errormessage = '';
                     console.log(this.errormessage, err);
                    }
                  });

              var inParam = JSON.stringify({
                  AccountNumber: this.OutBoundPopData.BAAccountNumber,
                  StartDate: cbStDate,
                  EndDate: cbEndDate,
                  StartTime: cbStTime,
                  EndTime: cbEndTime,
                  ModeID: parseInt(this.selectedCBMode.ModeID),
                  CallID: "",
                  AgentComment: this.callbackRemarks,
                  TargetAmount: 0
              });

              this._httpClient.SetCallbackWithComments(window['config'].LCMURL,inParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);
                           
                  if (!Res.data) {
                    return;
                }
                this.cberror = "Call back successfully updated";
                var today = new Date();
                this.CBEndDate = today;
                this.CBStartDate = today;
                this.selectedCBMode = this.CBModes[0];
                this.selectedCBType = this.CBTypes[0];
                this.callbackRemarks = "";
                this.cbflag = true;

                (error:any)=> {
                  this.cberror = 'Unable to updated Callback: ' + error.message;
                  var today = new Date();
                  this.CBEndDate = today;
                  this.CBStartDate = today;
                  this.selectedCBMode = this.CBModes[0];
                  this.selectedCBType = this.CBTypes[0];
                  this.callbackRemarks = "";
                  this.cbflag = false;
              }    
                          
                },
                error: (err: any) => {
                  
                  this.errormessage = '';
                 console.log(this.errormessage, err);
                }
              });


          }
          else if (this.selectedCBType.id == "2") {

              var cbStTime = moment(this.CBStartDate).format('HH:mm:ss');
              var cbStDate = moment(this.CBStartDate).format('DD/MM/YYYY');

              var cbStDateTime = moment(this.CBStartDate).format('DD/MM/YYYY HH:mm');

              var cbEndTime = moment(this.CBEndDate).format('HH:mm:ss');
              var cbEndDate = moment(this.CBEndDate).format('DD/MM/YYYY');

              var cbEndDateTime = moment(this.CBEndDate).format('DD/MM/YYYY HH:mm');

              var inCBParam = JSON.stringify({
                  UniqueCallId: this.OutBoundPopData.UniqueNumber,
                  BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
                  CBStDateTime: cbStDateTime,
                  CBEndDateTime: cbEndDateTime,
                  ModeID: this.selectedCBMode.ModeID,
                  CallID: "",
                  UserID: this.OutBoundPopData.AgentID,
                  CBType: this.selectedCBType.Description,
                  ModeOfCall: "PredictiveOutbound",
                  Ani: this.OutBoundPopData.label1,
                  AgentID: this.OutBoundPopData.AgentID,
                  AgentName: this.OutBoundPopData.AgentName,
                  CampaignName: this.OutBoundPopData.CampaignName,
                  AgentRemarks: this.callbackRemarks,
                  TargetAmount: 0,
                  ModeDescription: this.selectedCBMode.Description,
                  CBStDate: cbStDate,
                  CBEndDate: cbEndDate,
                  CBStTime: cbStTime,
                  CBEndTime: cbEndTime
              });

              //insert call back data to custom db
              this._httpClient.POSTInsertCallBackData(window['config'].CustomApiUrl,inCBParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);
                                                  
                          
                },
                error: (err: any) => {
                  
                  this.errormessage = '';
                 console.log(this.errormessage, err);
                }
              });

              //invoking SetPersonalCallbackWithComments

              var inParam = JSON.stringify({
                  AccountNumber: this.OutBoundPopData.BAAccountNumber,
                  StartDate: cbStDate,
                  EndDate: cbEndDate,
                  StartTime: cbStTime,
                  EndTime: cbEndTime,
                  ModeID: parseInt(this.selectedCBMode.ModeID),
                  CallID: "", UserID: this.OutBoundPopData.AgentID,
                  AgentComment: this.callbackRemarks,
                  TargetAmount: 0
              });

              this._httpClient.SetPersonalCallbackWithComments(window['config'].LCMURL,inParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);
                  if (!Res.data) {
                    return;
                }
                this.cberror = "Personal Callback successfully updated";
                this.setDate();
                this.selectedCBMode = this.CBModes[0];
                this.selectedCBType = this.CBTypes[0];
                this.callbackRemarks = "";
                this.cbflag = true;      
           
                 (error:any) =>{
                  this.cberror = 'Unable to updated Personal Callback: ' + error.message;
                  // var today = new Date();
                  //this.CBEndDate = today;
                  // this.CBStartDate = today;
                  this.setDate();
                  this.selectedCBMode = this.CBModes[0];
                  this.selectedCBType = this.CBTypes[0];
                  this.callbackRemarks = "";
                  this.cbflag = false;
              }         
                          
                },
                error: (err: any) => {
                  
                  this.errormessage = '';
                 console.log(this.errormessage, err);
                }
              });

            

          }
      }
  }

  catch (ex) {
      this.cberror = ex;
  }

}

cleareErrormsg() {

  if (this.errormessage != '' || this.errormessage != null) {
      this.errormessage = '';
  }
  if (this.cberror != '' || this.cberror != null) {
      this.cberror = '';
  }
  if (this.outcomeerror != '' || this.outcomeerror != null) {
      this.outcomeerror = '';
  }
  // $timeout(cleareErrormsg, 5000);
};

 dayDuration = 60 * 60 * 24 * 1000;

 areDatesEqual(date1:any, date2:any) {
  return Math.floor(date1 / this.dayDuration) == Math.floor(date2 / this.dayDuration);
}

disabledTest(data: any): boolean {
  const date = data.date,
          mode = data.mode;
   
    let isRealDate = false;
   
    for (let i = 0; i < this.dates.length; i++) {
      const changedDate = Date.parse(this.dates[i]);
   
      if (this.areDatesEqual(changedDate, date)) {
        isRealDate = true;
        return mode === 'day' && !isRealDate;
      }
    }
   
    return false;
  }

IsValidInputs  () {
  this.isValid = '';
  var currDate = moment(new Date()).format('DD/MMM/YYYY');
  var currTime = moment(new Date()).format('HH:mm');
  var cbStTime = moment(this.CBStartDate).format('HH:mm');
  var cbStDatetime = moment(this.CBStartDate).format('DD/MMM/YYYY HH:mm');

  var cbEndTime = moment(this.CBEndDate).format('HH:mm');
  var cbEndDatetime = moment(this.CBEndDate).format('DD/MMM/YYYY HH:mm');

  if (this.selectedCBType == undefined || this.selectedCBType == null || this.selectedCBType.id == "0") {
      this.cberror = "Select Call-Back Type";
      this.isValid = false;
  }
  else if (this.selectedCBMode == undefined || this.selectedCBMode == null || this.selectedCBMode.ModeID == "0") {
      this.cberror = "Select Call-Back Mode";
      this.isValid = false;
  }
  else if (this.CBStartDate == null) {
      this.cberror = "Please enter valid Start date time";
      this.isValid = false;
      return;
  }
  else if (this.CBEndDate == null) {
      this.cberror = "Please enter valid End date time";
      this.isValid = false;
      return;
  }
  else if (((moment(this.CBStartDate, 'DD/MMM/YYYY')).diff(moment(currDate, 'DD/MMM/YYYY'), 'days')) < 0) {
      this.cberror = "Start date cannot be less than current date";
      this.isValid = false;
  }
  else if ((moment(this.CBStartDate, 'DD/MMM/YYYY').diff(moment(this.CBEndDate, 'DD/MMM/YYYY'), 'days')) > 0) {
      this.cberror = "Start date cannot be greater than End date";
      this.isValid = false;
  }
  /*
  else if (cbStTime < currTime && moment(currDate).format('DD/MMM/YYYY') == moment(this.CBStartDate).format('DD/MMM/YYYY')) {
     this.cberror  = "StartTime entered in the past, please re-enter a new time...";
      this.isValid = false;
  } 
  else if (cbEndTime < currTime && moment(currDate).format('DD/MMM/YYYY') == moment(this.CBEndDate).format('DD/MMM/YYYY')) {
      this.cberror  = "EndTime entered in the past, please re-enter a new time...";
      this.isValid = false;
  } 
  */
  else if (moment(cbEndDatetime).format('DD/MMM/YYYY HH:mm') < moment(cbStDatetime).format('DD/MMM/YYYY HH:mm')) {
      this.cberror = "End DateTime should be greater than Start DateTime";
      this.isValid = false;
  }
  else if (this.callbackRemarks == null || this.callbackRemarks == undefined || this.callbackRemarks == "") {
      this.cberror = "Call back Remarks should not empty";
      this.isValid = false;
  }
  else {
      this.isValid = true;
  }
}
}