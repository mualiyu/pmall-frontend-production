import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import moment from "moment";
import { copyToClipboard } from "./copyTextToClipboard";
import Toast from "./Toast"
import "../index.css";

export default function DebitCard(props) {
  const { user } = useUser();
  const [toast, setToast] = useState(null);


  const handleCopy = () => {
		if (!user?.refId) {
			setToast({ message: "No referral ID found!", type: "error" });
			setTimeout(() => setToast(null), 5000);
			return;
		}
	
		copyToClipboard(`${user.refId}`, (message, type) => {
			setToast({ message, type });
			setTimeout(() => setToast(null), 5000);
		});
	};

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    <div className="debit_card_container">
      <div className="debit_card">
        <div className="debit_card-inner">
          <div className="debit_card_front">
            <img
              src="/map.png"
              className="map-img"
              alt="Pmall"
              style={{ opacity: "0.1" }}
            />
            <div className="">
              <div className="flex justsb">
              <img
                src="/chip.png"
                width="30px"
                alt="Pmall"
              />
              <p style={{ textTransform: "capitalize", fontSize: 12 }}>
                {user?.storeName
                  ? user?.storeName
                  : user?.fname + " " + user?.lname}
              </p>
              </div>
              <div style={{padding:10}}>
                <h1 style={{ fontSize: 20 }}>&#x20A6;0.00</h1>
                <p style={{ color: "rgb(227 227 227 / 70%)", fontSize: 10 }}>
                  Balance on wallet
                </p>
              </div>
            </div>
            <div className="card-no flex">
              <p style={{ fontSize: 18 }}  onClick={handleCopy} >{user?.refId}
              </p>
              <ContentCopyIcon title="Click to copy" 
              onClick={handleCopy} 
              style={{ cursor: 'pointer', marginLeft: '8px', color: '#ffffff8f' }} />
            </div>
            <div className="row debit_card_name">
              

              {/* <div className="">
                <p>{moment(user?.regDate).add(1, "years").calendar()} </p>
                <p style={{ color: "rgb(227 227 227 / 70%)" }}>Due Next</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
