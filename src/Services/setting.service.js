import { fetchWrapper } from '../Helpers';
import React, { useState, useEffect ,useContext} from 'react';
import { ConfigContext } from "../components/Context"
import { appService } from './app.service';
let baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
const apiurlForForms=`${import.meta.env.VITE_APP_FORM_API_URL}`;
const videoUrl= `${import.meta.env.VITE_APP_API_VIDEOURL}`;
const ext = `${import.meta.env.VITE_SHOP_EXTENSION}`;
const addtocartUrl = window.location.origin+ext;
//let baseUrl="";
//const apiurlForForms=`${import.meta.env.VITE_APP_FORM_API_URL}`;
export const settingService = {  
  getSettingFilters,
  getAllSettings,
  getSettingNavigation,
  getSettingDetail,
  dropAHint,
  friendsEmail,
  validateDealerPassword,
  scheduleViewing,
  requestMoreInfo,
  getSettingVideoUrl,  
};
function getSubstringTillCom(url) {
  const index = url.indexOf(".com");
  if (index !== -1) {
    //console.log(url.substring(0, index + 4))
    return url.substring(0, index + 4); // +4 to include ".com"
  } else {
    //console.log(url)
    return url; // Return the original URL if ".com" is not found
  }
}


async function getDomainURL(){
  try {
    const res = await appService.getConfigSetting();  
    if(res) {
      let data = res.data;       
      baseUrl=getSubstringTillCom(res.data.dealerauthapi)+"/api/RingBuilder";
    }       
  } catch (err) {       
    //setError("Failed to fetch products. Please try again later.");         
  }
}
getDomainURL();
//to get all setting filters
function getSettingFilters(option,dealerId) {  
  let queryParam = getQueryFilterParam(option);
  return fetchWrapper.get(`${baseUrl}/GetFilters?DealerId=${dealerId}${queryParam}`);
}


//to get setting details for particualr setting
function getSettingDetail(settingId,dealerId,isLabGrown,shop) {
  if(isLabGrown==true){
    return fetchWrapper.get(`${apiurlForForms}/reactconfig/GetMountingDetail?DealerId=${dealerId}&SID=${settingId}&shop=${shop}`);
  }else{
    return fetchWrapper.get(`${apiurlForForms}/reactconfig/GetMountingDetail?DealerId=${dealerId}&SID=${settingId}&shop=${shop}`);
  }
  
}
//get all settings
function getAllSettings(option,dealerId) {  
  //console.log(option)
 
  let queryParam = getQueryParam(option);
  return fetchWrapper.get(`${baseUrl}/GetMountingList?DealerId=${dealerId}${queryParam}`);
}
//to get setting vanigation
function getSettingNavigation(dealerId){ 
  if(dealerId!=null &&dealerId!=undefined ){
    return fetchWrapper.get(`${baseUrl}/GetRBNavigation?DealerId=${dealerId}`);
  }
}
//drop a hint call
function dropAHint(formData,sendRequest,apiCall){
  return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
  )
}
//send email to friend
function friendsEmail(formData,sendRequest,apiCall){
 return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
  )
}
//dealer info auth and get dealer info
function validateDealerPassword(data,page){
  if(page==='setting') {
    return fetchWrapper.postFormData(
      `${apiurlForForms}/settings/authenticate`,
       data
      );
  }else{
    return fetchWrapper.postFormData(
      `${apiurlForForms}/diamondtools/authenticate`,
       data
      );
  } 
}
//schedule viewing
function scheduleViewing(formData,sendRequest,apiCall){  
 return fetchWrapper.postFormData(
   `${apiurlForForms}/${sendRequest}/${apiCall}`,
   formData
  );
}
//get video url
function getSettingVideoUrl(settingId){
  return fetchWrapper.get(`${videoUrl}?InventoryID=${settingId}&Type=Jewelry`); 
 }
 //request info popup call
function requestMoreInfo(formData,sendRequest,apiCall){
  return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
   ); 
}
//set parameters for setting
function getQueryParam(option){
  let filterString = "";
  if(option.pageSize && option.pageSize!==undefined){   
    filterString = 'pageSize='+option.pageSize;    
  }
  console.log(filterString)
  if(option.pageNumber && option.pageNumber!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'pageNumber='+option.pageNumber;    
  }
  if(option.searchSetting && option.searchSetting!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'SID='+option.searchSetting;    
  }
  if(option.orderBy && option.orderBy!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'OrderBy='+option.orderBy  ; 
  }
  if(option.priceMin!=="" && option.priceMin!==undefined && option.priceMax!=="" && option.priceMax!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'priceMin='+option.priceMin+"&priceMax="+option.priceMax  ;  
    //console.log(filterString)
  }
  //console.log(filterString)
  if(option.shape && option.shape!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Shape='+option.shape;    
  }
  if(option.metalType && option.metalType!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'MetalType='+option.metalType;    
  }
  if(option.style && option.style!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Collection='+option.style;    
  }
  if(option.isLabSettingsAvailable == false){
    
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=0';    
  }
  if(option.isLabSettingsAvailable == true){
    
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=1';    
  }
  if(option.CenterStoneMinCarat !=="" && option.CenterStoneMaxCarat !=="" ){
    
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'CenterStoneMinCarat='+option.CenterStoneMinCarat+"&CenterStoneMaxCarat="+option.CenterStoneMaxCarat;    
  }  
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  } 
}
//set patameters for setting filters
function getQueryFilterParam(option){
 
  let filterString = "";
  if(option.shape && option.shape!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Shape='+option.shape;    
  }
  if(option.metalType && option.metalType!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'MetalType='+option.metalType;    
  }
  if(option.style && option.style!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Collection='+option.style;    
  }
  if(option.isLabSettingsAvailable ===true ){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=1';    
  }
  if(option.isLabSettingsAvailable ===false ){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=0';    
  }
  //console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  } 
}
