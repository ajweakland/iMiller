import React from 'react';

const Mint = ({ account, MainMint, initConnect }) => {



  return (
    <div className="mint">




      {account == "" ? (
        <div className="claim1">

          <img className="pisss img-fluid center-block" onClick={initConnect} src={require('./assets/images/IM-Site-Connect-to-mint.png')} ></img>

        </div>
      ) : (
        <div className="pisss-c">
          <img className="pisss-3 img-fluid center-block" src={require('./assets/images/SITEgitowt.png')} onClick={MainMint}></img>

          <img className="pisss-2 img-fluid center-block" src={require('./assets/images/PEE-ANIMA.gif')}></img>
          <img className="pisss" src={require('./assets/images/SITEpiss.png')} onClick={MainMint}></img>





        </div>
      )}
    </div>

  );

};

export default Mint;