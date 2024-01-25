var config = config ||{}

config.Wrapup=[{id:"00",description:"Select Wrapup"},
	      {id:"01",description:"Invalid Number"},
{id:"02",description:"Lead Agri Term Loan"},
{id:"03",description:"Lead CASA"},
{id:"04",description:"Lead OD"},
{id:"05",description:"Lead KCC"},
{id:"06",description:"Lead CV"},
{id:"07",description:"Lead Gold Loan"},
{id:"08",description:"Lead HL"},
{id:"09",description:"Lead Life Insurance"},
{id:"10",description:"Lead MSME"},
{id:"11",description:"Lead Non-Life Insurance"},
{id:"12",description:"Lead TWO WHEELER"},
{id:"13",description:"NC Line ringing not responding"},
{id:"14",description:"NC_Beep Tone"},
{id:"15",description:"NC_Hung Up"},
{id:"16",description:"NC_Not In Service"},
{id:"17",description:"NC_Not Reachable"},
{id:"18",description:"NC_Switched Off"},
{id:"19",description:"Not Contacted"},
{id:"20",description:"NOT FUND"},
{id:"21",description:"NOT INTERESTED NOT REQUIRED"},
{id:"22",description:"NOT PICKEDNO REPLAY"},
{id:"23",description:"status_name"},
{id:"24",description:"Wrong Number"},
{id:"25",description:"Branch Follow up"},
{id:"26",description:"Customer Follow up"},
{id:"27",description:"Interested in CV"},
{id:"28",description:"Interested in HL"},
{id:"29",description:"Payout Query"},
{id:"30",description:"Case Status Query"},
{id:"31",description:"Link Required"},
{id:"32",description:"Call Drop"},
{id:"33",description:"Interested in Unsecured Business Loan"},
{id:"34",description:"Lead Mudra Loan"},
{id:"35",description:"Informed to connector"}
];

config.MenuMaster=[
{id:'NA',Desc:'NA'},
{id:'MN_0001',Desc:'Main Menu'},
{id:'MN_0002',Desc:'Pin Collection_BlockCard'},
{id:'MN_0003',Desc:'Pin Collection_BankingServices'},
{id:'MN_0004',Desc:'Banking Services Menu'},
{id:'MN_0006',Desc:'Language Selection Menu'},
{id:'MN_0007',Desc:'Cheque Number Collection'},
{id:'MN_0008',Desc:'Old Pin Collection'},
{id:'MN_0009',Desc:'New Pin Collection'},
{id:'MN_0010',Desc:'New Pin Confirmation'},
{id:'MN_0011',Desc:'Cheque Number Collection'},
{id:'MN_0012',Desc:'Cheque Number Confirmation'},
{id:'MN_0013',Desc:'Non Registered Menu'},
{id:'MN_0014',Desc:'Mobile Number Collection'},
{id:'MN_0015',Desc:'General Menu'},
{id:'MN_0023',Desc:'Global Menu'},
{id:'MN_0029',Desc:'Mobile/AccountNo Collection'},
{id:'MN_0040',Desc:'Expiry Date Collection'},
{id:'MN_0034',Desc:'Account number collection'},
{id:'MN_0031',Desc:'Customer ID Collection'},
{id:'MN_0037',Desc:'Debit Card Collection'},
{id:'MN_0041',Desc:'Green Pin Collection'},

{id:'MN_0042',Desc:'Green Pin Confirmation'}]

/*Get All Call back types*/
config.CBTypes = [{ id: 0, Description: 'None' }, 
{ id: 1, Description: 'Callback' }, 
{ id: 2, Description: 'Personal Callback' }];

config.LCMURL="https://lcm.aubank.in/AULCMWebservice/Contracts/LCMWCFService.svc/";
config.CustomApiUrl="https://pccedatadr.aubank.in/AUFAPI/Screenpop/";
config.CustomOBApiUrl="https://pccedatadr.aubank.in/AUFOBAPI/Screenpop/";