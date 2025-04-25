import React from 'react';
import { useParams } from 'react-router-dom';

const Claim = ({ Claim1, trySubmitTest, isTokenOwner, setTokenOwner, formSubmitted, initRecheck, account, formWait2 }) => {

  const { id } = useParams();


  window.onload = initRecheck(id);


  return (
    <div className="claim1">
      <p id="formSubmitted" ></p>


      {isTokenOwner == true ? (
        <div>


          {formSubmitted == false ? (

            <div>

              <form name="claim1ID22" target="iframe_handle2" method="post" id="claim1ID22">
                <input type="hidden" name="form-name" value="claim1ID22" />
                <p>
                  <label>Preferred Name: <br /><input id="text1" type="text" name="name" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />Email Address: <br /><input id="text1" type="text" name="email" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />Phone # (Optional. By submitting you will receive a call from imiller): <br /><input id="text1" type="text" name="phone" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />Shirt Size (Chest Size):<br />
                    <select id="text1" name="size" className="textEnter">
                      <option value="XS">XS - 33"- 35"</option>
                      <option value="S">S - 35"- 38"</option>
                      <option value="M">M - 38" - 41" </option>
                      <option value="L">L - 43" - 44"</option>
                      <option value="XL">XL - 45" - 48" </option>
                      <option value="2XL">2XL - 48" - 52" </option>
                      <option value="3XL">3XL - 53.5" - 56"</option>
                    </select></label>
                </p>

                <p>
                  <label><br />Shirt Style:<br />
                    <select id="text1" name="style" className="textEnter">
                      <option value="Standard Length">Standard Length</option>
                      <option value="Crop Top">Crop Top</option>
                    </select></label>
                </p>
                <br />
                <p>
                  <label><br />Shipping Address - <br /><br />
                    Street Address:<br />
                    <input id="text1" type="text" name="street" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />Apartment # or Suite: <br />
                    <input id="text1" type="text" name="apt-suite" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />City: <br />

                    <input id="text1" type="text" name="city" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />State: <br />
                    <input id="text1" type="text" name="state" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />Zip Code: <br />
                    <input id="text1" type="text" name="zippp" className="textEnter" /></label>
                </p>
                <p>
                  <label><br />Country: <br />
                    <input id="text1" type="text" name="cntry" className="textEnter" /></label>
                </p>
                <p>
                  <label type="hidden"><br /> <br />
                    <input id="text1" type="hidden" name="ethaddy" value={account} className="textEnter" /></label>
                </p>
                <p>
                  <label type="hidden"><br /> <br />
                    <input id="text1" type="hidden" name="owntokenidAddyverify" value={account} className="textEnter" /></label>
                </p>
                <p>
                  <br />
                  {formWait2 ? (
                    <p />
                  ) : (
                    <div>
                      <img className="claimingTImee img-fluid center-block" onClick={() => trySubmitTest(id)} src={require('./assets/images/IM-Site-Claym.png')} ></img>
                    </div>
                  )}
                </p>
              </form>


              <p id="formSubmittedStatus" ></p>
              <p id="form" ></p>

            </div>


          ) : (

            <img className="pisss img-fluid center-block" src={require('./assets/images/IM-Site-Itum-Claym-Sussess.png')} ></img>

          )}

        </div>
      ) : (
        <div>
          <button id="claim" >Do you own a token yet?? Recheck your connected to the correct wallet if so!</button>

        </div>
      )}

      <iframe id="iframe_handle2id" name="iframe_handle2" className="iframe_handle"> </iframe>


    </div>

  );

};

export default Claim;