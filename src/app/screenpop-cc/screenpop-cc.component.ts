import { Component } from '@angular/core';
import { CommonWebApiService } from '../common-web-api.service';
import * as moment from 'moment';

type NewType = undefined;

@Component({
  selector: 'app-screenpop-cc',
  templateUrl: './screenpop-cc.component.html',
  styleUrls: ['./screenpop-cc.component.css']
})
export class ScreenpopCCComponent {

  Obhistory :any;
  OutBoundPopData :any;
  CallScreenData :any;
  // CallData :any;
  isValid = true;
  cbflag = false;
isOnboardCampaign = false;
   xmlbusObj1 :any;
  loginID = '';
  agentname = '';
  loginExtenstion = '';
  uniqueId = '';
   xmlbusObj :any;
  // CBTypes = config.CBTypes;
  // selectedCBType = this.CBTypes[0];
  isOutcomeEnable = true;
  wrapup: any;
  wrapupyesno: any;
  selectedwrapup: any;
  CBTypes:any; selectedCBType:any; CBStartDate:any;  CBEndDate:any;  CBStartDateOption:any;  CBStartDatePopup:any; OpenCBStartDate:any;   CBEndDatePopup:any;
  CBEndDateOption:any;  OpenCBEndDate:any;  receivedmessage:any;  isOnboardCampaign1:any;

  label1=''; label2=''; label3=''; label4=''; label5=''; label6='';  label7='';  label8=''; label9=''; label10=''; label11=''; label12='';
label13='';  label14=''; label15=''; label16='';  label17='';  label18=''; label19=''; label20=''; label21=''; label22=''; label23=''; label24='';  label25='';

IsInbound :any;  IsOutbound:any; IsPredictiveOutbound:any;  ScreeType = 'OUTBOUND PREDECTIVE';  isCBRemarks:any;  callbackRemarks:any; agentRemarks:any;
BusOutcome:any;  selectedoutCome:any;  ParentBusOutcome:any;  selectedParent:any;  selectedCBMode:any;  CBModes:any; 

errormessage:any;  outcomeerror:any; OutBoundPopData1:any;
  cberror: any;  dates:any; IsSurvey:any; customStyle:any;
  teamName: any;  isWrapupenable:any;  issurveyenable:any;  premiumyes:any;  IsPremiumCaller:any;  premiumno:any;  CCdata:any; selectedvalue:string='Sevent';
  customerName:any;  txtNextDueDate:any;  txtOutstandingBalance:any;  txtBilledOutStanding:any;  ScreenPopData:any;  history:any;
  resData: any;  isSendsms:any;  wrapupMaster:any; wrapupSubMaster:any;  issubcategory:any;  selectedSubWraup:any; selectedWraup:any;
  Sendsms: any;  selectedwrapupyesno:any;  wrapupresData:any;

  constructor(private _httpClinet: CommonWebApiService){
    console.log(window["config"]);
    this.CBTypes = window["config"].CBType;
    this.selectedCBType=window["config"].CBType
    this.wrapup=window['config'].Wrapup;
    this.wrapupyesno=window['config'].Wrapupyesno;
    this.selectedwrapup = this.wrapup[0];
    this.IsSurvey=window["config"].IsSurvey
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
    }
  }

  //------------------------------------------------ predictive ---------------------------------------
  turnGreen() {
    this.customStyle.style = {
        "color": "#000000",
        "background-color": "#00ff00",
        "font-size": "15px",
    };
}

turnRed() {
  this.customStyle.style = {
      "color": "#000000",
      "background-color": "#ff0000",
      "font-size": "15px",
  };
}

preskill() {
  this.customStyle.preskill = {
      "color": "#ffbf00",
      "background-color": "#6a0dad",
      "font-size": "15px",
  };
}

turnBlue () {
  this.customStyle.style = { "color": "blue" };
}

  generateUniquenum () {
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
  
 this.CBStartDateOption = {
     timepickerOptions: { readonlyInput: false, showMeridian: false },
     datepickerOptions: {
         minDate: fromday,
         maxDate: null
     }
 };
  
 this.CBStartDatePopup = { opened: false };
  
 this.OpenCBStartDate = (e: any) => {
     var fromday = new Date();
  
     this.CBStartDateOption = {
         timepickerOptions: { readonlyInput: false, showMeridian: false },
         datepickerOptions: {
             minDate: fromday,
             maxDate: null
         }
     };
  
     e.preventDefault();
     e.stopPropagation();
  
     this.CBStartDatePopup.opened = true;
 };
  
 // End Date date configuration:
  
 var today = new Date();
  
 this.CBEndDateOption = {
     timepickerOptions: { readonlyInput: false, showMeridian: false },
     datepickerOptions: {
         minDate: today,
         maxDate: null
     }
 };
  
 this.CBEndDatePopup = { opened: false };
  
 this.OpenCBEndDate = (e: any) => {
     this.CBEndDateOption = {
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
            
        case 'OutboundEndData': {
          /*Load agent information from finesse */ 
          let calldata =this.receivedmessage;// JSON.parse(this.receivedmessage.data);
              
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
          
            console.log(JSON.stringify(event.data)+'Controller JS Time '+ new Date());
                     calldata = JSON.parse(event.data);
    
                    if (calldata.Callvariables.BACampaign.indexOf("Credit") !== -1) {
                        this.isOnboardCampaign = false;
                        this.isOnboardCampaign1 = true;
                        this.label1 = "ANI";
                        this.label2 = "Campaign Name";
                        this.label3 = "AUSBAccountNo";
                        this.label4 = "CustomerName";
                        this.label5 = "ProductCode";
                        this.label6 = "ProductDesc";
                        this.label7 = "BranchCode";
                        this.label8 = "BranchName";
                        this.label9 = "LCCode";
                        this.label10 = "ACOpeningDate";
                        this.label11 = "MailID";
                        this.label12 = "CustomerProfile";
              this.label13 = "CustomerID";
              this.label14 = "ExistingCard";
              this.label15 = "ExistingLimit";
              this.label16 = "ExistingVariant";
              this.label17 = "Preapprovedoffer";
              this.label18 = "Others";
                    }
            else if (calldata.Callvariables.BACampaign.indexOf("Xpress") !== -1) {
                    this.isOnboardCampaign = true;
              this.isOnboardCampaign1 = false;
            
                        this.label1 = "ANI";
                        this.label2 = "Campaign Name";
                        this.label3 = "AUSBAccountNo";
                        this.label4 = "CustomerName";
                        this.label5 = "ProductCode";
                        this.label6 = "ProductDesc";
                        this.label7 = "BranchCode";
                        this.label8 = "BranchName";
                        this.label9 = "LCCode";
                        this.label10 = "ACOpeningDate";
                        this.label11 = "MailID";
                        this.label12 = "CustomerProfile";				
                        this.label13 = "CustomerID";
                        this.label14 = "ExistingCard";
                        this.label15 = "ExistingLimit";
                        this.label16 = "ExistingVariant";
                        this.label17 = "Preapprovedoffer";
                        this.label18 = "Others";
                      this.label19 = "CustomerName";
                      this.label20 = "TransactionAmount";
              this.label21 = "TransactorRevolver";
              this.label22 = "MobileNumber";
              this.label23 = "AlternateNumber";
              this.label24 = "CardType";
              this.label25 = "PDD";
                    }
            
                    if (calldata.type == "OnPredictiveOutboundCall") {
    
    
                        setTimeout(() => {
                            this.IsInbound = false;
                            this.IsOutbound = false;
                            this.IsPredictiveOutbound = true;
                            this.ScreeType = '';
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
         
        let calldata =this.receivedmessage; 
       
        
           calldata = JSON.parse(event.data);
          this.agentname = calldata.agentName
          this.loginID = calldata.agentID;
          this.loginExtenstion = calldata.Extension;

          if (calldata.state == "NOT_READY" || calldata.state == "READY") {
              
                  this.OutBoundPopData = {};
                  this.isOutcomeEnable = true;
      //this.isOnboardCampaign=false;
             
              // -------resetting values---- //
              this.setDate();

          

              this.callbackRemarks = "";
              this.agentRemarks = "";
              if (this.BusOutcome != null && this.BusOutcome != undefined) {
                  this.selectedoutCome = this.BusOutcome[0];
              }
              if (this.ParentBusOutcome != null && this.ParentBusOutcome != undefined) {
                  this.selectedParent = this.ParentBusOutcome[0];
              }
              if (this.CBModes != null && this.CBModes != undefined) {
                  this.selectedCBMode = this.CBModes[0];
              }
              if (this.CBTypes != null && this.CBTypes != undefined) {
                  this.selectedCBType = this.CBTypes[0];
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
               this.OutBoundPopData1 = {
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
           if ((calldata.Callvariables.BACampaign.indexOf("Credit") !== -1) || (calldata.Callvariables.BACampaign.indexOf("Callback") !== -1)) {
this.isOnboardCampaign=false;
                this.label1 = "ANI";
                this.label2 = "Campaign Name";
                this.label3 = "AUSBAccountNo";
                this.label4 = "CustomerName";
                this.label5 = "ProductCode";
                this.label6 = "ProductDesc";
                this.label7 = "BranchCode";
                this.label8 = "BranchName";
                this.label9 = "LCCode";
                this.label10 = "ACOpeningDate";
                this.label11 = "MailID";
                this.label12 = "CustomerProfile";
      this.label13 = "CustomerID";
      this.label14 = "ExistingCard";
      this.label15 = "ExistingLimit";
      this.label16 = "ExistingVariant";
      this.label17 = "Preapprovedoffer";
      this.label18 = "Others";
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
                    this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
                        this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
                        this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
                }


                /* Get Call History- Calls made for specific contact by dialednumber*/
                /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
                    this.loadhistory(this.CallScreenData.Callerid11);
                }*/
            }

if (calldata.Callvariables.BAStatus == "PERSONAL_CALLBACK_OUTBOUND_RESERVATION") {
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
                    this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
                        this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
                        this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
                }


                /* Get Call History- Calls made for specific contact by dialednumber*/
                /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
                    this.loadhistory(this.CallScreenData.Callerid11);
                }*/
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
            if (calldata.Callvariables.BACampaign.indexOf("Credit") !== -1) {

                this.label1 = "ANI";
                this.label2 = "Campaign Name";
                this.label3 = "AUSBAccountNo";
                this.label4 = "CustomerName";
                this.label5 = "ProductCode";
                this.label6 = "ProductDesc";
                this.label7 = "BranchCode";
                this.label8 = "BranchName";
                this.label9 = "LCCode";
                this.label10 = "ACOpeningDate";
                this.label11 = "MailID";
                this.label12 = "CustomerProfile";
      this.label13 = "CustomerID";
      this.label14 = "ExistingCard";
      this.label15 = "ExistingLimit";
      this.label16 = "ExistingVariant";
      this.label17 = "Preapprovedoffer";
      this.label18 = "Others";
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
                    this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
                        this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
                        this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
                }


                /* Get Call History- Calls made for specific contact by dialednumber*/
                /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
                    this.loadhistory(this.CallScreenData.Callerid11);
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
                    this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
                        this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
                        this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
                }


                /* Get Call History- Calls made for specific contact by dialednumber*/
                /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
                    this.loadhistory(this.CallScreenData.Callerid11);
                }*/
            }



        
   
  

          break;
        }
        case 'GetDPOffercallValues': {
          debugger;
          // this.appService.LoadAgentDetails(this.receivedmessage)
          let calldata =this.receivedmessage;
            
           calldata = JSON.parse(event.data);
          try {
          } catch (ex) { }
   
  

          break;
        }
        case 'UserLoad': {
          debugger;
          // this.appService.LoadAgentDetails(this.receivedmessage)
          let calldata =this.receivedmessage;
           calldata = JSON.parse(event.data);
          //alert("From UserStateIB");
          if (calldata.type == "UserLoad") {
            this.teamName= calldata.TeamName;
            this.getWrapupCodes();
                
          }
    
          break;
        }
        case 'UserData': {
          debugger;
          // this.appService.LoadAgentDetails(this.receivedmessage)
          let calldata =this.receivedmessage;
            
          
             calldata = JSON.parse(event.data);
            if (calldata.state == "NOT_READY" || calldata.state == "READY") {
      this.teamName= calldata.TeamName;
                this.getWrapupCodes();

                this.isWrapupenable = true;
      this.isSendsms = false;
                this.agentRemarks = '';

                
                    this.errormessage = '';
                    this.ScreenPopData = {};
        this.CCdata={};
                    this.customStyle = {};
                    this.ScreeType = '';
                    this.agentname = calldata.agentName
                    this.loginID = calldata.agentID;
                    this.loginExtenstion = calldata.Extension;
                
              
            }
        

          break;
        }
         case 'CallData': {
           debugger;
          
            var calldata = JSON.parse(event.data);
            console.log(calldata);

            if (calldata.type == "OnBeginCall")
            {
               this.IsInbound = true;
                var _language = '';
       this.teamName= calldata.TeamName;
                 this.getWrapupCodes();
                switch (calldata.Callvariables.callVariable3) {
                    case 'ENG':
                        _language = 'ENGLISH';
                        break;
                    case 'HIN':
                        _language = 'HINDI';
                        break;
                    case 'PUN':
                        _language = 'PUNJABI';
                        break;
                    case 'MAR':
                        _language = 'MARATHI';
                        break;
                    case 'RAJ':
                        _language = 'RAJASTHANI';
                        break;
                    case 'GUJ':
                        _language = 'GUJARATI';
                        break;
                    default:

                }

                //var obj = $filter('filter')(config.MenuMaster, function (d) { return d.id === calldata.Callvariables.callVariable4; })[0];

                this.isWrapupenable = false;
       this.issurveyenable = true;

                var ScreenPopData = {
                    ANI: calldata.Callvariables.callVariable1,
                    RegisterNo: calldata.Callvariables.callVariable2,
                   // LastMenu: obj.Desc,
        LastMenu: 'Credit card',
                    Language: _language,
                    SkillName: calldata.Callvariables.callVariable5,
                    CallKey: calldata.Callvariables.callVariable6,
                    CustomerID: calldata.Callvariables.callVariable7,
                    SelfVerifiedPIN: calldata.Callvariables.callVariable8,
        CallDataExt:calldata.extn,
        CallDataAgentID:calldata.AgentId ,
        CallDataAgentName:calldata.AgentName,
ICMCallID:calldata.Callvariables.callVariable6,
        MobileNo:calldata.Callvariables.callVariable1.substring(calldata.Callvariables.callVariable1.length-10,calldata.Callvariables.callVariable1.length)

                };
      
                this._httpClinet.GETBranchNameDetails(window['config'].CustomApiUrl,ScreenPopData.MobileNo).subscribe({
                  next: (Res: any) => {
                    console.log("api response", Res);                              
                    this.ScreenPopData.BranchName = Res.data       
                            
                  },
                  error: (err: any) => {
                    
                    this.errormessage = 'Unable to load BranchName Details: ' + err.message;
                   console.log(this.errormessage, err);
                  }
                });
      
    // var obj = filter('filter')(window["config"].SkillMaster,
    //  function (d:any) {return d.id === calldata.Callvariables.callVariable5;})[0];

    const filteredArray = window["config"].SkillMaster.filter((d: any) => d.id === calldata.Callvariables.callVariable5);
    const obj = filteredArray.length > 0 ? filteredArray[0] : null;

    if(obj== undefined)
    {
      this.premiumyes = "NA";
      
    }
    else
    {
      this.premiumyes = obj.Val;
    }
        // this.premiumyes = obj.Val== undefined ? "NA" : obj.Val;
        //if (this.Multipleexist(this.feedback ,calldata.Callvariables.callvariable5))
       if(this.premiumyes!='NA')  // will show whatever value in callVariable5. need to add the VIP skill once confirm from IVR
      
                 //if(ScreenPopData.IsPremiumCaller=='YES')
       {
         this.IsPremiumCaller=true;
        
       }
       else
       {
         this.IsPremiumCaller=false;
         this.premiumno='NA';
          
      } 

                //if (ScreenPopData.CustomerID != 'NA') {
        console.log("Print");
     		
 this.change(this.selectedvalue);

{
  for(let i=0; i < this.CCdata.length; i++)
  {
    if(this.CCdata[i].CardNumber == this.selectedvalue)
    {
      this.customerName =  this.CCdata[i].CustomerName;
      this.txtNextDueDate = this.CCdata[i].NextDueDate;
      this.txtOutstandingBalance = this.CCdata[i].OutStandingBalance;
      this.txtBilledOutStanding = this.CCdata[i].BilledOutStandingBalance;
    }
  }
}		 
                    this.ScreenPopData = ScreenPopData;
                   this.ScreeType = 'INBOUND';
              
               this.IsInbound = true;
               this.IsOutbound = false;
               this.IsPredictiveOutbound = false;
                if (this.ScreenPopData.SelfVerifiedPIN == "Y") {
                    this.ScreenPopData.SelfVerifiedPIN = "YES";
                    this.turnGreen();
                }
                else {
                    this.ScreenPopData.SelfVerifiedPIN = "NO";
                    this.turnRed();
                }

                if (this.ScreenPopData.SkillName == "AU-ROYALE") {

                    this.preskill();
                }

                //if(ScreenPopData.RegisterNo !='NA')
                if (ScreenPopData.ANI != 'NA') {
                    //httpService.httpRequest('GET',config.CustomApiUrl+'GETHistoryDetails?registerMobNo='+ScreenPopData.RegisterNo,'')
                    this._httpClinet.GETHistoryDetails(window['config'].CustomApiUr,ScreenPopData.ANI).subscribe({
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
                var callRemarks = {
                    ANI: ScreenPopData.ANI,
                    RegisterMobNo: ScreenPopData.RegisterNo,
                    LastMenu: ScreenPopData.LastMenu,
                    Language: ScreenPopData.Language,
                    CustomerID: ScreenPopData.CustomerID,
                    CallKey: ScreenPopData.CallKey,
                    SkillGroup: ScreenPopData.SkillName,
                    AgentID:ScreenPopData.CallDataAgentID==undefined||ScreenPopData.CallDataAgentID =='' ?this.loginID:ScreenPopData.CallDataAgentID,
                    AgentName:ScreenPopData.CallDataAgentName ==undefined||ScreenPopData.CallDataAgentName =='' ?this.agentname:ScreenPopData.CallDataAgentName,
        Ext : ScreenPopData.CallDataExt ==undefined||ScreenPopData.CallDataExt == ''?this.loginExtenstion:ScreenPopData.CallDataExt

                }

                this._httpClinet.POSTInsertCallRemarks(window['config'].CustomApiUrl,JSON.stringify(callRemarks)).subscribe({
                  next: (Res: any) => {
                    console.log("api response", Res);
                                                                                        
                  },
                  error: (err: any) => {                   
                    this.errormessage = 'Unable to insert calldata: ' + err.message;
                   console.log(this.errormessage, err);
                  }
                });

                 ///SMS CR//
        var smsData={
          ANI: this.ScreenPopData.ANI,
                    RegisterMobNo:this.ScreenPopData.RegisterNo,
         CustomerID:this.ScreenPopData.CustomerID,
    CallKey:this.ScreenPopData.CallKey,
    AgentID:this.loginID,
    Language:ScreenPopData.Language
        }
                     var x=0;

                     this._httpClinet.POSTInsertSMSDetails(window['config'].CustomApiUrl,JSON.stringify(smsData)).subscribe({
                      next: (Res: any) => {
                        console.log("api response", Res);
                        this.resData=Res.data;          
                                                                          
                     },
                      error: (err: any) => {
                        
                        this.errormessage = '';
                       console.log(this.errormessage, err);
                      }
                    });
            }
              else if(calldata.type == "OnEndCall")
    {
       console.log(this.isSendsms);
                 if (this.resData == 'Y') {
                     this.resData = '';
         
         
                       let smsData = {
                         ANI: this.ScreenPopData.ANI,
                         RegisterMobNo: this.ScreenPopData.RegisterNo,
                         CustomerID: this.ScreenPopData.CustomerID,
                         CallKey: this.ScreenPopData.CallKey,
           AgentID:this.ScreenPopData.CallDataAgentID,
             Language:this.ScreenPopData.Language
                     }
         if(this.isSendsms == false){
          this._httpClinet.sendSMS(window['config'].CustomApiUrl,JSON.stringify(smsData)).subscribe({
            next: (Res: any) => {
              console.log("api response", Res);
              if (Res.data == 'Y') {
                this.isSendsms = true;
            }         
                                  
            },
            error: (err: any) => {
              
              this.errormessage = 'Unable to send SMS data: ' + err.message;
             console.log('Failed in sms sending  ' + err.message);
            }
          });
         }
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
  change(selectedvalue: any) {
   console.log('Selected value:', selectedvalue);
   
  }



getParentOutcome(BAAccountNumber:any) { 
  this._httpClinet.GetBOGroupParent(window['config'].LCMURL,JSON.stringify({ AccountNumber: BAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }
    var busObj :any;
    busObj = Res.data.d;
    busObj.splice(0, 0, { ParentId: "0", ParentName: "None" });

    setTimeout( () => {
        this.ParentBusOutcome = busObj;
        this.selectedParent = this.ParentBusOutcome[0];
       
    }, 10);          
              
    },
    error: (err: any) => {
      
      this.outcomeerror = 'Unable to load Parent-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
}

getAllBusinessOutcome (BAAccountNumber:any) {
  this._httpClinet.GetBusinessOutCome(window['config'].LCMURL,JSON.stringify({ AccountNumber: BAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
               
      if (!Res.data) {
        return;
    }

    var busObj: any[] = [];
    busObj = Res.data.d;
    busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

    setTimeout( () => {
        this.BusOutcome = busObj;
        this.selectedoutCome = this.BusOutcome[0];
        //  this.$apply();

    }, 10);           
    },
    error: (err: any) => {
      
      this.outcomeerror = 'Unable to load Business-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
 
}
getOutcome() {
  if (this.selectedParent.ParentId == "0") {
      return;
  }
  var inParam = JSON.stringify({ AccountNumber: this.OutBoundPopData.BAAccountNumber, ParentBusinessOutcomeId: this.selectedParent.ParentId });

  this._httpClinet. GetBusinessOutcomeParent(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }
    var busObj: any[] = [];
    busObj = Res.data.d;
    busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

    setTimeout( () => {
        this.BusOutcome = busObj;
        this.selectedoutCome = this.BusOutcome[0];
        // this.$apply();

    }, 10);             
    },
    error: (err: any) => {
 
      this.outcomeerror = 'Unable to load parent based Business-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });

}

enableremarks() {
  this.isCBRemarks = false;
}


getModes(BAAccountNumber:any) {

  var inParam = JSON.stringify({ AccountNumber: BAAccountNumber });

  this._httpClinet.GetModes(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }
    var busObj :any;
    busObj = Res.data.d;
    busObj.splice(0, 0, { ModeID: "0", Description: "None" });

    setTimeout(() => {
        this.CBModes = busObj;
        this.selectedCBMode = this.CBModes[0];
        // this.$apply();

    }, 10);                                
    },
    error: (err: any) => {
      
      this.cberror = 'Unable to load call back modes: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
  
}

loadhistory(ani:any) {
  this._httpClinet.GETHistoryDetails(window['config'].CustomOBApiUrl,ani).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      this.Obhistory = Res.data;                    
    },
    error: (err: any) => {   
      this.errormessage = 'Unable to load History data: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
 
}

loadScreenpopdata(campaignName:any, customerName:any, leadID:any, bAAccountNumber:any, dialednumber:any, babuddyname:any){
  console.log('GetScreenPopData for BAaccount'+bAAccountNumber+' and Request Starts at '+new Date());

  this._httpClinet. GetScreenPopData(window['config'].LCMURL,JSON.stringify({ AccountNumber: bAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }

    var busObj:any;
console.log('GetScreenPopData Response'+Res.data.d+' and Request ends at '+new Date());
    this.xmlbusObj = Res.data.d;
    this.xmlbusObj1 = this.xmlbusObj.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
    var replaceamp=this.xmlbusObj1.replace('&', '');
//     var x2js = new X2JS();
// busObj = x2js.xml_str2json(replaceamp);     
var attempt=bAAccountNumber.split('|');
					var retry=parseInt(attempt[3])+1;

          if (campaignName.indexOf("Credit") !== -1) {

            var OutBoundPopData1 = {
                CampaignName: campaignName == undefined ? "" : campaignName,
                BACustomerName: customerName == undefined ? "" : customerName,
                BALeadID: leadID == undefined ? "" : leadID,
                BAAccountNumber: bAAccountNumber == undefined ? "" : bAAccountNumber,
                BABuddyName: babuddyname == undefined ? "" : babuddyname,
                LeadID: busObj.Data.Lead_Id == undefined ? "" : busObj.Data.Lead_Id,
                Callerid11: dialednumber == undefined ? "" : dialednumber,
                label1: busObj.Data.Customer_Phone_No == undefined ? "" : busObj.Data.Customer_Phone_No,
                label2: busObj.Data.Campaign_Name == undefined ? "" : busObj.Data.Campaign_Name,
                label3: busObj.Data.AU_SB_Account_No == undefined ? "" : busObj.Data.AU_SB_Account_No,
                label4: busObj.Data.Customer_Name == undefined ? "" : busObj.Data.Customer_Name,
                label5: busObj.Data.Product_Code == undefined ? "" : busObj.Data.Product_Code,
                label6: busObj.Data.Product_Desc == undefined ? "" : busObj.Data.Product_Desc,
                label7: busObj.Data.Branch_Code == undefined ? "" : busObj.Data.Branch_Code,
                label8: busObj.Data.Branch_Name == undefined ? "" : busObj.Data.Branch_Name,
                label9: busObj.Data.LC_Code == undefined ? "" : busObj.Data.LC_Code,
                label10: busObj.Data.AC_Opening_Date == undefined ? "" : busObj.Data.AC_Opening_Date,
                label11: busObj.Data.Mail_ID == undefined ? "" : busObj.Data.Mail_ID,
                label12: busObj.Data.Customer_Profile == undefined ? "" : busObj.Data.Customer_Profile,
  label13: busObj.Data.CustomerID == undefined ? "" : busObj.Data.CustomerID,
  label14: busObj.Data.Existing_Credit_Card_if_any == undefined ? "" : busObj.Data.Existing_Credit_Card_if_any,
  label15: busObj.Data.Existing_Credit_Card_Limit == undefined ? "" : busObj.Data.Existing_Credit_Card_Limit,
  label16: busObj.Data.Existing_Credit_Card_Variant == undefined ? "" : busObj.Data.Existing_Credit_Card_Variant,
  label17: busObj.Data.Preapproved_offer == undefined ? "" : busObj.Data.Preapproved_offer,
  label18: busObj.Data.Others == undefined ? "" : busObj.Data.Others,
                UniqueNumber: this.uniqueId == undefined ? "" : this.uniqueId,
                AgentID: this.loginID == undefined ? "" : this.loginID,
                AgentName: this.agentname == undefined ? "" : this.agentname,
                Extension: this.loginExtenstion == undefined ? "" : this.loginExtenstion
            };
            this.OutBoundPopData = OutBoundPopData1;
        }
    else if (campaignName.indexOf("Xpress") !== -1) {
let OutBoundPopData1 = {
  CampaignName: campaignName == undefined ? "" : campaignName,
                BACustomerName: customerName == undefined ? "" : customerName,
                BALeadID: leadID == undefined ? "" : leadID,
                BAAccountNumber: bAAccountNumber == undefined ? "" : bAAccountNumber,
                BABuddyName: babuddyname == undefined ? "" : babuddyname,
                LeadID: busObj.Data.Lead_Id == undefined ? "" : busObj.Data.Lead_Id,
                Callerid11: dialednumber == undefined ? "" : dialednumber,
  label19: busObj.Data.Customer_Name == undefined ? "" : busObj.Data.Customer_Name,
  label20: busObj.Data.Transaction_Amount == undefined ? "" : busObj.Data.Transaction_Amount,
  label21: busObj.Data.Transactor_Revolver == undefined ? "" : busObj.Data.Transactor_Revolver,
  label22: busObj.Data.Mobile_Number == undefined ? "" : busObj.Data.Mobile_Number,
  label23: busObj.Data.Alternale_Mobile_Number == undefined ? "" : busObj.Data.Alternale_Mobile_Number,
  label24: busObj.Data.Card_Type == undefined ? "" : busObj.Data.Card_Type,
  label25: busObj.Data.PDD == undefined ? "" : busObj.Data.PDD,
  UniqueNumber: this.uniqueId == undefined ? "" : this.uniqueId,
                AgentID: this.loginID == undefined ? "" : this.loginID,
                AgentName: this.agentname == undefined ? "" : this.agentname,
                Extension: this.loginExtenstion == undefined ? "" : this.loginExtenstion
  };
            this.OutBoundPopData = OutBoundPopData1;
       }
       this.OutBoundPopData = this.OutBoundPopData1;

       if (this.OutBoundPopData != null && this.OutBoundPopData != undefined) {
        console.log("InsertCallDetails triggered");
                    this.InsertCallDetails();
                }

                /* Get Call History- Calls made for specific contact by mobile number*/
                if (this.OutBoundPopData.label1 != 'NA' && this.OutBoundPopData.label1 != null) {
                    this.loadhistory(this.OutBoundPopData.label1);
                }
}
  }),
   (error:any)=> {
      this.errormessage = 'Unable to load ScreenpopData: ' + error.message;
  };
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
    this._httpClinet.POSTInsertCallData(window['config'].CustomInsuranceUrl,incalldataParam).subscribe({
      next: (Res: any) => {
        console.log("api response", Res);
        this.errormessage = "Call Data Added successfully"         
                
      },
      error: (err: any) => {
        
        this.errormessage = 'Unable to insert call data: ' + err.message;
       console.log(this.errormessage, err);
      }
    });
   
}
else {
    this.errormessage = "Unique Number is empty";
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
    this.cbflag = false;

    var inOutParam = JSON.stringify({
        UniqueCallId: this.OutBoundPopData.UniqueNumber,
        BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
        ParentOutcome: this.selectedParent.ParentId,
        ParentOutcomeDesc: this.selectedParent.ParentName,
        BusinessOutcome: this.selectedoutCome.OutComeID,
        BusinessOutcomeDesc: this.selectedoutCome.Description,
        DNCInfo: "",
        CallID: "", UserID: this.OutBoundPopData.AgentID,
        AgentRemarks: this.agentRemarks, TargetAmount: '0',
        ModeOfCall: "PredictiveOutbound",
        Ani: this.OutBoundPopData.label1,
        AgentID: this.OutBoundPopData.AgentID,
        AgentName: this.OutBoundPopData.AgentName,
        CampaignName: this.OutBoundPopData.CampaignName,

    });

    //insert outcome data in to custom db
    this._httpClinet.POSTInsertOutcome(window['config'].CustomOBApiUrl,inOutParam).subscribe({
      next: (Res: any) => {
        console.log("api response", Res);              
      },
      error: (err: any) => {      
        this.errormessage = '';
       console.log(this.errormessage, err);
      }
    });
    if (this.OutBoundPopData.label1 != 'NA' && this.OutBoundPopData.label1 != null) {
      this.loadhistory(this.OutBoundPopData.label1);
  }

    if (this.cbflag == false) {

        var inParam = JSON.stringify({ AccountNumber: this.OutBoundPopData.BAAccountNumber, Outcome: this.selectedoutCome.OutComeID, CallID: "", UserID: "", AgentComment: this.agentRemarks, TargetAmount: 0 });
    //log params
    this._httpClinet.SetBusinessOutcomeWithComments(window['config'].LCMURL,inParam).subscribe({
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
    } else {
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
setDNC() {

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

      this._httpClinet.POSTInsertDNC(window['config'].CustomOBApiUrl,inOutParam).subscribe({
        next: (Res: any) => {
          console.log("api response", Res);
          this.outcomeerror = "DNC Added successfully";     
 	             
        },
        error: (err: any) => {      
          this.outcomeerror = 'Unable to insert DNC data: ' + err.message;
         console.log(this.errormessage, err);
        }
      });
      

      var inParam = JSON.stringify({
          AccountNumber: this.OutBoundPopData.BAAccountNumber, Outcome: "5",
          DNCInfo: ",", CallID: this.OutBoundPopData.UniqueNumber, UserID: this.OutBoundPopData.AgentID, AgentComment: this.agentRemarks, TargetAmount: 0
      });

var cbStTime = moment(this.CBStartDate).format('HH:mm:ss');
      var cbStDate = moment(this.CBStartDate).format('DD/MM/YYYY');

      var cbStDateTime = moment(this.CBStartDate).format('DD/MM/YYYY HH:mm');

      var cbEndTime = moment(this.CBEndDate).format('HH:mm:ss');
      var cbEndDate = moment(this.CBEndDate).format('DD/MM/YYYY');
var addcbEndDateTime = moment(this.CBEndDate).add(10,'years');
      var cbEndDateTime = moment(addcbEndDateTime).format('DD/MM/YYYY HH:mm');

            var Setcallarray = {
        "SetCallResult":
                     [
               {
              "UserID": "", 
                      "AccountNumber": this.OutBoundPopData.BAAccountNumber,    
                                      "OutcomeId": 5,      
                                      "CallbackModeID": 0,      
                                      "StartDate": "",      
                                      "EndDate": "",      
                                      "StartTime": "",     
                                      "EndTime": "",      
                                      "SecondaryOutcomeId": 0,      
                                      "CampaignSpecificDNC": "3",      
                                      "LeadScore": 0,      
                                      "AgentComments": this.agentRemarks,      
                                      "TargetAmount": 0,      
                                      "IsInbound": false,      
                                      "isPhoneNoDNC": true,      
                                      "BussfldDNCValue": "",      
                                      "Blockedby": "",      
                                      "DialerAgentCallback": true,      
                                      "OverridePEWCValidation": true,      
                                      "DNCBlockStartDate": cbStDateTime,      
      "DNCBlockEndDate": cbEndDateTime
      }
      ]
      };
var setcallobj = JSON.stringify(Setcallarray);			  
      var dataParameterBody = {"callResults":setcallobj};
//var  dataParameterBody = {"callResults":"{\"SetCallResult\":[{\"UserID\":\"\",\"AccountNumber\":\"178|3|3|0|0|84|-1\",\"AgentComments\":\"\",\"TargetAmount\":0,\"LeadScore\":0,\"IsInbound\":false,\"DialerAgentCallback\":false,\"OverridePEWCValidation\":false,\"IsAuthenicationSuccess\":false,\"isPhoneNoDNC\":true,\"BussfldDNCValue\":\"\",\"BussfldDNCValue1\":\"\",\"OutcomeId\":5,\"Blockedby\":\"PhoneNumber\",\"CampaignSpecificDNC\":\"\",\"DNCBlockStartDate\":\"18/08/2020 17:39\",\"DNCBlockEndDate\":\"19/08/2030 17:39\"}]}"};
     
  this._httpClinet.SetCallResults(window['config'].LCMURL,dataParameterBody).subscribe({
     next: (Res: any) => {
    console.log("api response", Res);
    if (!Res.data) {
							
      return;
     }
  if (Res.data.d) {
          this.outcomeerror = "DNC outcome successfully updated";
        
          this.agentRemarks = "";

      }

 else{
  this.outcomeerror = "DNC outcome got failure";
  this.agentRemarks = "";
     } (error:any)=> {
      this.outcomeerror = 'Unable to updated DNC-Outcome: ' + error.message;
      this.agentRemarks = "";
  }               
            
  },
  error: (err: any) => {  
    this.errormessage = '';
   console.log(this.errormessage, err);
  }
});

 /*---------- httpService.httpRequest('POST', config.LCMURL + 'SetCallResults', dataParameterBody)
          .then(function (val) {
              if (!val.data) {
    
                  return;
              }
     if (val.data.d) {
                      this.outcomeerror = "DNC outcome successfully updated";
                    
                      this.agentRemarks = "";

                  }
    else{
              this.outcomeerror = "DNC outcome got failure";
              this.agentRemarks = "";
    }
          },
          function (error) {
              this.outcomeerror = 'Unable to updated DNC-Outcome: ' + error.message;
              this.agentRemarks = "";
          });-------------*/

  }
  catch (ex) {
      this.outcomeerror = ex;
  }

}
setCallback() {

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
              this._httpClinet.POSTInsertCallBackData(window['config'].CustomOBApiUrl,inCBParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);            
                  // this.cberror  = "Callback inserted successfully";
                                     
                },
                error: (err: any) => {
                  
                  this.cberror  = 'Unable to insert callback data: ' + err.message;
                 console.log(this.errormessage, err);
                }
              });
  
    //New callback with business outcome 
        var inParam = JSON.stringify({
                 AccountNumber: this.OutBoundPopData.BAAccountNumber,
          BusinessOutcome:this.selectedoutCome.OutComeID,
                   StartDate: cbStDate,
                   EndDate: cbEndDate,
                   StartTime: cbStTime,
                   EndTime: cbEndTime,
                   ModeID: parseInt(this.selectedCBMode.ModeID),
                   CallID: "",
                   AgentComment: this.callbackRemarks,
                   TargetAmount: 0,
                   UserID: this.OutBoundPopData.AgentID
               });

       
               this._httpClinet.SetBusinessOutcomeWithCallback(window['config'].LCMURL,inParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);
                           
                  if (!Res.data) {
                    return;
                }
               if(Res.data.d){
                this.cberror = "Call back successfully updated";
                var today = new Date();
                this.CBEndDate = today;
                this.CBStartDate = today;
                this.selectedCBMode = this.CBModes[0];
                this.selectedCBType = this.CBTypes[0];
                this.callbackRemarks = "";
                this.cbflag = true;
               }
                                                  
                },
                error: (err: any) => {
                  this.cberror = 'Unable to updated Callback: ' + err.message;
                  var today = new Date();
                  this.CBEndDate = today;
                  this.CBStartDate = today;
                  this.selectedCBMode = this.CBModes[0];
                  this.selectedCBType = this.CBTypes[0];
                  this.callbackRemarks = "";
                  this.cbflag = false;
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
              this._httpClinet.POSTInsertCallBackData(window['config'].CustomInsuranceUrl,inCBParam).subscribe({
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



              this._httpClinet.SetPersonalCallbackWithComments(window['config'].LCMURL,inParam).subscribe({
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
                          
                },
                error: (err: any) => {
                  
                  this.cberror = 'Unable to updated Personal Callback: ' + err.message;
                                // var today = new Date();
                                //this.CBEndDate = today;
                                // this.CBStartDate = today;
                                this.setDate();
                                this.selectedCBMode = this.CBModes[0];
                                this.selectedCBType = this.CBTypes[0];
                                this.callbackRemarks = "";
                                this.cbflag = false;
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
IsValidInputs() {
  this.isValid = true;
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


//------------------------------------ outBound -------------------------
SetAgentStatus(agentState:any,agentId:any) {

  var inParam = JSON.stringify( {"agentID": agentId,"agentState": agentState} );
  this._httpClinet.SetAgentStatus(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
               
      if (!Res.data) {
        return;
    }            
    },
    error: (err: any) => {
      
      this.errormessage = 'Unable to load SetAgentStatus: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
 
}
//-------------------------------------InBound ----------------------------

postmsg(data: any): boolean {
  try {
  
    const win = window.parent;
 
    if (win) {
      win.postMessage(data, '*');
      return true; 
    } else {
      console.error('Parent window not found');
      return false; 
    }
  } catch (ex) {
    console.error('Error in postmsg:', ex);
    return false; 
  }
}

Transfer() {
  this.issurveyenable = false;
  this.isSendsms = true;
  this.postmsg(JSON.stringify({ type: "ConsultTransfer" }));
};


getWrapupCodes() {
  this._httpClinet.GetWrapupCategoryDetails(window['config'].CustomApiUrl,this.teamName).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      this.wrapupMaster = Res.data;   
             
    },
    error: (err: any) => {
      
      this.errormessage = 'Unable to load wrapup codes: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
}

getWrapupSubCodes() {
  this._httpClinet.GetWrapupSubCategoryDetails(window['config'].CustomApiUrl,this.teamName,this.selectedwrapup).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      this.wrapupSubMaster = Res.data;                         
    },
    error: (err: any) => {
      
      this.errormessage = 'Unable to load wrapup codes: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
}

// enableremarks() {
//   this.issubcategory=true;
//   this.getWrapupSubCodes();
//       // this.isOBRemarks = true;
//    }

enableWrapup ()
		{
			if(this.selectedSubWraup != '' || this.selectedSubWraup  != undefined)
			{
				this.isWrapupenable = true;
			}
		}
  
 submit() {

      if (this.ScreenPopData.SRNumber == "" || this.ScreenPopData.SRNumber == undefined) {
          this.errormessage = 'Enter the SRNumber ';
          return;
      }
      if (this.ScreenPopData.SelfVerifiedPIN == "" || this.ScreenPopData.SelfVerifiedPIN == undefined) {
          this.errormessage = 'Enter the Pin';
          return;
      }
if(this.selectedWraup =='')
{
  this.errormessage = 'Enter the Category';
         return;
}
if(this.selectedWraup !='' && this.selectedSubWraup == '')
{
  this.errormessage = 'Enter the SubCategory';
         return;
}

     var wrapup = {
         AgentRemarks: this.agentRemarks,
         WrapString:'',
         WrapCode:'00',
         CallID: this.ScreenPopData.CallKey,
         RegisterMobNo: this.ScreenPopData.RegisterNo,
         AgentID:this.ScreenPopData.CallDataAgentID==undefined||this.ScreenPopData.CallDataAgentID =='' ?this.loginID + "|" + this.loginExtenstion:this.ScreenPopData.CallDataAgentID + "|" + this.ScreenPopData.CallDataExt,
 AgentExtension:this.ScreenPopData.CallDataExt,
         AgentName:this.ScreenPopData.CallDataAgentName ==undefined||this.ScreenPopData.CallDataAgentName =='' ?this.agentname:this.ScreenPopData.CallDataAgentName,		           
         SRNumber: this.ScreenPopData.SRNumber,
         CallBackTaken: this.selectedwrapupyesno.description,
         //CallBackTakenCode: this.selectedwrapupyesno.id,
         svPin: this.ScreenPopData.SelfVerifiedPIN,
 CustomerMobileNo: (this.ScreenPopData.MobileNo == undefined || this.ScreenPopData.MobileNo =='')?'NA' :this.ScreenPopData.MobileNo,
         CustomerName:(this.ScreenPopData.CustomerName == undefined || this.ScreenPopData.CustomerName == '')? 'NA' :this.ScreenPopData.CustomerName,
         CIF: (this.ScreenPopData.CIF == undefined || this.ScreenPopData.CIF == '')? 'NA' :this.ScreenPopData.CIF,
         ICMCALLID:(this.ScreenPopData.ICMCallID == undefined || this.ScreenPopData.ICMCallID == '')? 'NA' :this.ScreenPopData.ICMCallID,
         BranchName:(this.ScreenPopData.BranchName == undefined || this.ScreenPopData.BranchName == '')? 'NA' :this.ScreenPopData.BranchName,
         TextFree: (this.ScreenPopData.TextFree == undefined || this.ScreenPopData.TextFree == '')? 'NA' :this.ScreenPopData.TextFree,
   Category :this.selectedWraup,
 SubCategory :this.selectedSubWraup,
 ProcessType : 'Credit Card'

     }
     this._httpClinet.POSTInsertAgentRemarks(window['config'].CustomApiUrl,wrapup).subscribe({
      next: (Res: any) => {
        console.log("api response", Res);
                 
        this.wrapupresData=Res.data;	
        if(this.wrapupresData=='SUCCESS'){
      this.errormessage="Wrapup Added successfully";
     this.isWrapupenable = false;
     this.getWrapupCodes();
      
     
   }	
else
{
    this.errormessage="Wrapup Not Added successfully something went wrong";
    this.isWrapupenable = false;
   this.getWrapupCodes();

}	

           this.wrapupSubMaster=[];
           this.wrapupMaster=[];
           this.selectedWraup = this.wrapupMaster[0];
           this.selectedSubWraup = this.wrapupSubMaster[0];
           this.selectedwrapupyesno = this.wrapupyesno[0];
           this.agentRemarks='';            
      },
      error: (err: any) => {
        
        this.errormessage = '';
       console.log(this.errormessage, err);
      }
    });
  
 }
 

}
