import React from 'react';
import Claim from './Claim.js';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';



const Owned = ({ Claim1, trySubmitTest, isTokenOwner, setTokenOwner, formSubmitted, ownerclickchecked }) => {



  return (
    <div className="DisplayImages">

      {ownerclickchecked ? (
        <p />
      ) : (
        <div>
          {isTokenOwner ? (
            <img className="pisss img-fluid center-block" onClick={Claim1} src={require('./assets/images/IM-Site-Chek-iF-oWner.png')} ></img>
          ) : (
            <img className="pisss img-fluid center-block" src={require('./assets/images/IM-Site-Wrong-Way.png')} ></img>
          )}

        </div>
      )}
      <div>

        <div id="OwnerStatus" className="OwnerStatus"> </div>

      </div>
      <div className="item" id="item">


      </div>



    </div>

  );

};

export default Owned;