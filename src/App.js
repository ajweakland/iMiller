import './App.css';
import abiTest from "./abi/abi.json";
import { ethers, BigNumber } from "ethers";
import { useState, useEffect } from "react";
import 'jquery';
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Claim from './Claim.js';
import ClaimWen from './ClaimWen.js';
import Mint from './Mint.js';
import Owned from './Owned.js';
import NotAllowedGob from './NotAllowedGob.js';
import Gallery from './GallErY.js';


const contractAddress = "0x1108696202D28CaDFD7189C1786e65A57a0Ed5C1";

function App() {

  const [account, setAccount] = useState("");
  const [isTokenOwner, setTokenOwner] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [provider, setProvider] = useState(null);
  const [mintError, setMintError] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintWait, setMintWaiting] = useState(false);
  const [formValueCheck, setformValueCheck] = useState(false);
  const [formWait2, setformWait2] = useState(false);
  const [formSuccess, setformSuccess] = useState(false);
  const [ownerclickchecked, setownerclickchecked] = useState(false);
  const [imageCnt, setImageCnt] = useState(
    require('./assets/images/IM-Site---0.png')
  );


  const MintCount = async () => {

    //have to check tokens owner by address connected first
    if (window.ethereum && provider != null) {
      //setThis
      const signer = provider.getSigner();
      var bal = 0;
      const contract = new ethers.Contract(contractAddress, abiTest, signer);

      try {
        bal = await contract.totalSupply();
        //tokensOwned = tempTokensOwned;
        bal = parseInt(bal.toString());
        console.log("minted count: ", bal);
        updateImg(bal);

      }
      catch (err) {
        //show error on screen 
        console.log("something went wrong with getting mint count .. what did u do???");
        console.log("err: ", err);

      }
    }
    else {
      console.log("Metamask or Rainbow wallet needed to mint sir.");
    }



  }

  const updateImg = async (bal) => {
    //show image based on this chanage src. 
    if (bal == 1) {
      setImageCnt(require('./assets/images/IM-Site---1.png'));
    }
    if (bal == 2) {
      setImageCnt(require('./assets/images/IM-Site---2.png'));
    }
    if (bal == 3) {
      setImageCnt(require('./assets/images/IM-Site---3.png'));
    }
    if (bal == 4) {
      setImageCnt(require('./assets/images/IM-Site---4.png'));
    }
    if (bal == 5) {
      setImageCnt(require('./assets/images/IM-Site---5.png'));
    }
    if (bal == 6) {
      setImageCnt(require('./assets/images/IM-Site---6.png'));
    }
    if (bal == 7) {
      setImageCnt(require('./assets/images/IM-Site---7.png'));
    }
    if (bal == 8) {
      setImageCnt(require('./assets/images/IM-Site---8.png'));
    }
    if (bal == 9) {
      setImageCnt(require('./assets/images/IM-Site---9.png'));
    }
    if (bal == 10) {
      setImageCnt(require('./assets/images/IM-Site---10.png'));
    }
  }

  const MainMint = async () => {
    const mintAmount = 1;
    //const isConnected = Boolean(account);


    if (window.ethereum) {
      setMintError(false);
      setMintSuccess(false);
      setMintWaiting(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abiTest, signer);
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.033 * mintAmount).toString()),
        });

        console.log("response: ", response);
        //show mint success message

        //mint pending -- loading screen

        //now figure out how to wait for true success.
        console.log('txn hash', response.hash);
        console.log(`Fetching txn receipt....`);

        let receipt = null;

        while (receipt === null) {
          try {
            receipt = await provider.getTransactionReceipt(response.hash);

            if (receipt === null) {
              console.log(`Trying again to fetch txn receipt....`);

              continue;
            }

            //dont need this. 
            console.log(`Receipt confirmations:`, receipt.confirmations);

            if (receipt.status !== 1) {

              setMintWaiting(false);
              setMintSuccess(false);
              setMintError(true);

              console.log(`Receipt Data:`, receipt.status);

              MintCount();
              break;
            }

            setMintWaiting(false);
            setMintError(false);
            setMintSuccess(true);

            MintCount();

          } catch (e) {

            setMintSuccess(false);
            setMintWaiting(false);
            setMintError(true);

            console.log(`Receipt error:`, e);

            MintCount();

            break;
          }
        }


      }
      catch (err) {
        //show error message
        setMintWaiting(false);
        setMintError(true);
        setMintSuccess(false);

        console.log("error: ", err);

        MintCount();
      }
    }

  }

  const Claim1 = async () => {



    //have to check tokens owner by address connected first
    if (window.ethereum) {
      //sign message here


      const isConnected = Boolean(account);

      const signer = provider.getSigner();

      const message = "PissssssSSssssss OoooN YoOuUuuuuu ahhhaHHHahhah";
      const signature = await signer.signMessage(message);
      const addressSignnneddd = ethers.utils.verifyMessage(message, signature);

      console.log(account.toLowerCase());
      console.log(addressSignnneddd.toLowerCase());

      //setThis
      var tokensOwned = new Array();
      const contract = new ethers.Contract(contractAddress, abiTest, signer);
      console.log(isConnected);
      console.log(isTokenOwner);

      if (isConnected && isTokenOwner && (addressSignnneddd.toLowerCase() == account.toLowerCase())) {
        setownerclickchecked(true);
        try {
          console.log("entered");
          tokensOwned = await contract.ownerOfTokenIds(account);
          //tokensOwned = tempTokensOwned;

          //if successful they own tokens display them now. 
          console.log("response: ", tokensOwned);
        }
        catch (err) {
          //show error on screen 
          console.log("err: ", err);

        }
        setTokenOwner(tokensOwned.length !== 0);
        var tokenList = "";
        var tokensMD = new Array(tokensOwned.length);
        for (var i = 0; i < tokensOwned.length; i++) {
          //fix this
          tokenList += tokensOwned[i].toString() + ", ";
          //another contract call get each tokens metadata display image and generate button in dynamic div - buttons display prper form and automate enterys as needed
          tokensMD[i] = await contract.tokenURI(tokensOwned[i]);

        }
        //now parse tokensMD and display dymanic divs and buttons - buttons link to form and set id property when clicked to automate
        for (var j = 0; j < tokensMD.length; j++) {
          const parse1 = tokensMD[j];
          const parse3 = parse1.split("ipfs://").pop();
          const parse2 = "https://ipfs.io/ipfs/" + parse3;
          console.log("log 1: " + parse2);
          const response2 = await fetch(parse2);
          if (!response2.ok)
            throw new Error(response2.statusText);

          const json = await response2.json();
          const parse4 = json.image;
          const parse5 = parse4.split("ipfs://").pop();
          const parse6 = "https://ipfs.io/ipfs/" + parse5;
          console.log("log 2: " + parse6);
          console.log(json.edition);

          var newdiv = document.createElement("div");
          var newImg = document.createElement("img");
          var newBtn = document.createElement("button");

          var newLink = document.createElement("a");

          newdiv.className = 'itemDiv';
          newImg.className = 'itemImg';
          newImg.src = parse6;
          //check if id claimed already and create claimed button if so.
          newBtn.className = 'claimbtn';

          //have to check tokens owner by address connected first
          var deresult = false;
          try {
            const response = await contract.checkClaimed(json.edition, BigNumber.from("1"));

            console.log("already claimed? : ", response);
            deresult = response;

          }
          catch (err) {
            //show error on screen 
            console.log("caught ya bich - doesnt show unless valid");
            console.log("err: ", err);
          }

          if (deresult) {
            newBtn.innerHTML = "Item " + json.edition.toString() + " Claimed";
            newLink.className = 'claimbtnD';
          }
          else {
            newBtn.innerHTML = "Claim item " + json.edition.toString();
            const urlPath = '/claimtime/' + json.edition.toString();
            newLink.href = urlPath;
            newLink.className = 'claimbtn';
          }
          newLink.appendChild(newBtn)
          newdiv.appendChild(newImg);
          newdiv.appendChild(newLink);

          document.getElementById("item").appendChild(newdiv);
          //  <div className="itemDiv">
          //<img className="itemImg" src="https://ipfs.io/ipfs/QmfN6opWZ3SoE4ProxpgpQcZQRkVVrCjaAaV8ZbN3Ptmdf/1.png"></img>
          //<button className="claimbtn" link="going to link to claim page.">Claim item 1</button>
          //</div>

        }

        document.getElementById("OwnerStatus").innerHTML = "Owned Tokens: " + tokenList;
        //image and item numbers dynamic make other one take an element id as well. 



      }



    }
  }




  const initConnect = async () => {
    if (typeof window.ethereum !== "undefiend") {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const Prov = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(Prov);
      setAccount(accounts[0]);
      console.log("init connect ran");

      const isConnected = Boolean(accounts[0]);

      //have to check tokens owner by address connected first
      if (window.ethereum) {
        const signer = Prov.getSigner();
        //setThis
        var tokensOwned = new Array();
        const contract = new ethers.Contract(contractAddress, abiTest, signer);

        if (isConnected) {

          try {
            tokensOwned = await contract.ownerOfTokenIds(accounts[0]);
            //tokensOwned = tempTokensOwned;

            //if successful they own tokens display them now. 
            setTokenOwner(tokensOwned.length != 0);
            console.log("response set token owner success: ", tokensOwned);
          }
          catch (err) {
            //show error on screen 
            console.log("err: ", err);

          }
          setTokenOwner(tokensOwned.length != 0);
          window.onload = setownerclickchecked(false);

          //have to check tokens owner by address connected first
          var bal = 0;

          try {
            bal = await contract.totalSupply();
            //tokensOwned = tempTokensOwned;
            bal = parseInt(bal.toString());
            console.log("minted count: ", bal);
            updateImg(bal);

          }
          catch (err) {
            //show error on screen 
            console.log("something went wrong with getting mint count .. what did u do???");
            console.log("err: ", err);

          }

        }
        else {
          console.log("not connected yet");
        }
      }


    }
    else {
      console.log("Metamask or Rainbow wallet needed to mint sir.");
    }
  };



  useEffect(() => {
    initConnect();

  }, []);



  const trySubmitTest = async (id) => {
    var successfullClaim = false;

    //check all values filled in correctly first. 
    if ("" == document.getElementById("text1").value) {
      setformValueCheck(true);
      //document.getElementById("formSubmittedStatus").innerHTML = "Please make sure form is filled out correctly!";
    }
    else {
      setformValueCheck(false);
      if (window.ethereum) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abiTest, signer);

        try {
          //1 will be id
          setMintError(false);
          setformWait2(true);
          setMintWaiting(true);
          const response = await contract.claimItem(BigNumber.from(id), BigNumber.from("1"), {
            value: ethers.utils.parseEther((0.0).toString()),
          });

          //check for full success and show loading her while waiting. hide form and showing submit in progress. 

          console.log("response: ", response);
          //
          let receipt = null;

          while (receipt === null) {
            try {
              receipt = await provider.getTransactionReceipt(response.hash);

              if (receipt === null) {
                console.log(`Trying again to fetch txn receipt....`);

                continue;
              }

              //dont need this. 
              console.log(`Receipt confirmations:`, receipt.confirmations);

              if (receipt.status !== 1) {

                //chnage this and add bottom images. 
                setMintWaiting(false);
                setMintError(true);
                setformWait2(false);

                console.log(`Receipt Data:`, receipt.status);

                break;
              }

              setMintWaiting(false);
              setMintError(false);
              setformWait2(false);

            } catch (e) {

              setMintWaiting(false);
              setMintError(true);
              setformWait2(false);

              console.log(`Receipt error:`, e);

              break;
            }
          }

          //
          successfullClaim = true;
        }
        catch (err) {

          setMintWaiting(false);
          setMintError(true);
          setformWait2(false);

          console.log("error: ", err);
          successfullClaim = false;
          document.getElementById("form").innerHTML = "exit from metamask error - display proper links";
        }


        if (successfullClaim) {
          //document.claim1ID.submit();
          document.getElementById("claim1ID22").submit();
          //document.getElementById("formSubmittedStatus").innerHTML = "SUBMITing....";

          var iframe = document.getElementById('iframe_handle2id');
          if (iframe) {
            iframe.onload = function () {

              //show success here img --- 
              //setformSuccess(true);
              //document.getElementById("formSubmitted").innerHTML = " form submitted and item claimed. :D";


            }
            // now you can do stuff, such as displaying a message or redirecting to a new page.
          }
        }

      }
      else {
        //claim unsuccessfull have them redo or retry display nessecayerrors/

      }

    }

  }

  const ClaimComplete = async () => {
    const isConnected = Boolean(account);
    var tokensOwned = new Array();


    if (window.ethereum) {


      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abiTest, signer);

      if (isConnected) {

        try {
          tokensOwned = await contract.ownerOfTokenIds(account);
          //if successful they own tokens display them now. 
          console.log("got tokens owned");

        }
        catch (err) {
          //show error on screen 
          console.log("error on tokens owned");

        }
      }
      try {
        const response = await contract.claimItem1(BigNumber.from(1), {
          value: ethers.utils.parseEther((0.0).toString()),
        });
        console.log("response: ", response);
      }
      catch (err) {
        console.log("error: ", err);
      }
    }

  }



  const initRecheck = async (idtest) => {

    const isConnected = Boolean(account);

    //have to check tokens owner by address connected first
    if (window.ethereum && provider != null) {
      const signer = provider.getSigner();
      //setThis
      var addressOwned = "";
      const contract = new ethers.Contract(contractAddress, abiTest, signer);

      if (isConnected) {


        try {
          const id = BigNumber.from(idtest);
          addressOwned = await contract.ownerOf(id);
          //tokensOwned = tempTokensOwned;

          console.log("address token owner: ", addressOwned);

          if (account.toUpperCase() === addressOwned.toUpperCase()) {


            //also set based on claim already complete for id and set formSubmitted
            //check claimed id and claim active 
            const response = await contract.checkClaimed(id, BigNumber.from("1"));

            console.log("already claimed? : ", response);

            if (response) {
              setFormSubmitted(true);
            }
            else {
              setFormSubmitted(false);
            }
          }
          else {
            setFormSubmitted(true);
          }

        }
        catch (err) {
          //show error on screen 
          console.log("caught ya bich - doesnt show unless valid");
          console.log("err: ", err);
          setFormSubmitted(true);

        }
      }
      else {
        console.log("not connected yet");
      }
    }
    else {
      console.log("Metamask or Rainbow wallet needed to mint sir.");
    }
  };


  return (
    <div className="page">
      <BrowserRouter>
        <div className="header">
          {account == "" ? (
            <img className="connectButton" onClick={initConnect} src={require('./assets/images/IM-Site-Connect.png')} />
          ) : (

            <p id="connectedWallet" ><img className="coNnecTid" src={require('./assets/images/IM-Site-Connectid.png')} />
              {":        " + account}</p>

          )}
          {isTokenOwner ? (
            <div>
              <Link to="/claim">
                <img className="claym" src={require('./assets/images/IM-Site-Claym.png')} />
              </Link>
            </div>
          ) : (
            <div />
          )}
          <div>
            <Link for="gallery" to="/gallery">
              <img className="gallery" src={require('./assets/images/Gallery-header-text.png')}>
              </img>
            </Link>
          </div>

          <Link to="/">
            <img className="ian" src={require('./assets/images/imiller-01.png')}>
            </img>
          </Link>

        </div>
        <img className="branch" src={require('./assets/images/SITEbranch.png')}></img>


        <Routes>
          <Route path="/" element={<Mint account={account} MainMint={MainMint} initConnect={initConnect} />} />
          <Route path="/claim" element={<Owned Claim1={Claim1} trySubmitTest={trySubmitTest} isTokenOwner={isTokenOwner} setTokenOwner={setTokenOwner} formSubmitted={formSubmitted} ownerclickchecked={ownerclickchecked} />} />
          <Route path="/gallery" element={<Gallery account={account} />} />
          <Route path="/claimtime/:id" element={<Claim Claim1={Claim1} trySubmitTest={trySubmitTest} isTokenOwner={isTokenOwner} setTokenOwner={setTokenOwner} formSubmitted={formSubmitted} initRecheck={initRecheck} account={account} formWait2={formWait2} />} />
          <Route path="*" element={<NotAllowedGob />} />


        </Routes>
        {mintError ? (
          <img className="miNtTiD2 img-fluid center-block" src={require('./assets/images/IM-Site-Errur.png')} ></img>

        ) : (
          <p></p>
        )}
        {mintSuccess ? (
          <img className="miNtTiD3 img-fluid center-block" src={require('./assets/images/IM-Site-Mint-Success.png')} ></img>

        ) : (
          <p></p>
        )}
        {mintWait ? (
          <img className="miNtTiD4 img-fluid center-block" src={require('./assets/images/IM-Site-piSS-lOADING.gif')} ></img>

        ) : (
          <p></p>
        )}
        {formValueCheck ? (
          <img className="miNtTiD5 img-fluid center-block" src={require('./assets/images/IM-Site-pLeez-recheck.png')} ></img>

        ) : (
          <p></p>
        )}
        {formWait2 ? (
          <div className="claim1">

            <img className="pisss img-fluid center-block" src={require('./assets/images/IM-Site-Submiteen-form.png')} ></img>

          </div>

        ) : (
          <p></p>
        )}


        <div>

          {account == "" ? (
            <div >

            </div>
          ) : (
            <div className="mintedCount">
              <img className="miNtTiD" src={require('./assets/images/IM-Site-Minted-Cownt.png')} />
              <img className="miNtTiDCNt" src={imageCnt} />
            </div>
          )}

        </div>
      </BrowserRouter>
    </div>


  );
}

export default App;
