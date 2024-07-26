import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./dealer-info.css";
import { settingService } from '../Services';
const DealerInfo = ({ className = "", onClose,settingId,isLabSetting,shopurl,diamondId,diamondtype }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorsFromRes, setErrorsFromRes] = useState('');
  const [dealerInfoAuthMessage, setDealerInfoAuthMessage] = useState('');
  const [dealerInfo, setDealerInfo] = useState({});
  
  //const [settingId, setSettingId] = useState(settingId);
  //const [isLabSetting, setIsLabSetting] = useState(isLabSetting);
  //const [shopurl, setShopurl] = useState(shopurl);
  
  const validatePassword = (password) => {
    return password.length >= 4;
  };

  const handleSubmit = async() => {
   
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Invalid password. It should be at least 6 characters long.');
      return;
    }

    // If password is valid, clear error and show details
    setError('');
    try {
      let formData={};
      let page="";
      console.log(diamondId);
      console.log(diamondtype)
      if(diamondId!=""  && diamondId!==undefined ){
        formData={
          password:password,
          diamondId:diamondId,
          diamondtype:diamondtype,
          shopurl:'gemfind-app-store.myshopify.com'
        }
         
        page="diamond";
      }else{
         
        formData={
          password:password,
          settingId:settingId,
          isLabSetting:isLabSetting,
          shopurl:shopurl
        }
        page="setting";
      }
    
      let formDataVal = new FormData();
      Object.keys(formData).forEach(function (key) {
        formDataVal.append(key,formData[key]);
      });
      //if(page==='setting') ? 
      //const res = await settingService.validateDealerPassword('auth_password='+password+'&settingId='+settingId+'&isLabSetting='+isLabSetting+'&shopurl='+shopurl,page)
      //;
      const res = await settingService.validateDealerPassword(formDataVal,page)
      ;
      if(res.output.status===2){
        setErrorsFromRes(res.output.msg);
       }
       if(res.output.status===1){
        setDealerInfoAuthMessage(res.output.msg)
        setDealerInfo(res.output.dealerInfo)
        setIsSuccess(true);
       }
      //setHintDropped(true);
      //setIsSuccess(true);
    } catch (error) {
      console.error('Error Dealer Info:', error);
      // show err msgs to user
    }
  

  };

  return (
    <div className={`dealer-info ${className}`}>
      <section className="content3">
        <div className="top3">       
          
          {errorsFromRes!="" &&              
          <div className='enter-your-password errorText'>{errorsFromRes}</div>              
          }
          {!isSuccess ? (
            <>
          <div className="h11">
            <h3 className="dealer-info1">Dealer Info</h3>
            <div className="enter-your-password">
              Enter your password to continue
            </div>
          </div>
         
            <div className="inputs1">
              <div className="drop4">
                <input
                  className={`your-gemfind-password ${error ? 'error' : ''}`}
                  name="dealer-password"
                  placeholder="Your Gemfind Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              <button className="button4" onClick={handleSubmit}>
                <b className="submit dealer_info">Submit</b>
              </button>
            </div>
            </>
          ) : (
            <div className="success-message">
              <h2>Vendor Info</h2>
              <section className="content3">
              <div className="top3">              
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                    Dealer Name:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.retailerName}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer Company:
                  </div>             
                  <div className="enter-your-password">
                    ss{dealerInfo.retailerCompany}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer City/State:
                  </div>             
                  <div className="enter-your-password">
                    ss{dealerInfo.retailerCity}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer Contact No.:
                  </div>             
                  <div className="enter-your-password">
                    ss{dealerInfo.retailerContactNo}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer Email:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.retailerEmail}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer Lot number of the item:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.retailerLotNo}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer Stock number of the item:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.retailerStockNo}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Wholesale Price:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.wholesalePrice}
                  </div>
                </div>

                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Third Party:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.thirdParty}
                  </div>
                </div>            
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Diamond Id:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.diamondID}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Seller Name:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.sellerName}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Seller Address:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.sellerAddress}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer Fax:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.retailerFax}
                  </div>
                </div>
                <div className="h11 dealerinfores" >
                  <div className="enter-your-password">
                  Dealer Address:
                  </div>             
                  <div className="enter-your-password">
                    {dealerInfo.retailerAddress} 
                  </div>
                </div>
              </div>
              </section>
            </div>
          )}
        </div>
      </section>          
      <img 
        className="close-icon2" 
        loading="lazy" 
        alt="" 
        src="/close.svg" 
        onClick={onClose}
      />
    </div>
  );
};

DealerInfo.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default DealerInfo;