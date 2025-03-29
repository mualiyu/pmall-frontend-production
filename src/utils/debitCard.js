import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import moment from "moment";
import "../index.css";

export default function DebitCard(props) {
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
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
            <div className="card-no">
              <p style={{ fontSize: 18 }}>{user?.refId}</p>
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
  );
}
