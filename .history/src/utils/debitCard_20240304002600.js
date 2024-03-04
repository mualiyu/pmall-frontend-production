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
              src="https://i.ibb.co/PYss3yv/map.png"
              className="map-img"
              alt="Pmall"
              style={{ opacity: "0.1" }}
            />
            <div className="row">
              <img
                src="https://i.ibb.co/G9pDnYJ/chip.png"
                width="45px"
                alt="Pmall"
              />
              <div>
                <h1 style={{ fontSize: 20 }}>&#x20A6;214,800</h1>
                <p style={{ color: "rgb(227 227 227 / 70%)" }}>
                  Balance on wallet
                </p>
              </div>
            </div>
            <div className="row card-no">
              <p style={{ fontSize: 18 }}>{user?.refId}</p>
            </div>
            <div className="row debit_card_name">
              <p style={{ textTransform: "capitalize" }}>
                {user?.storeName ? user?.storeName : user?.fname + user?.lname}
              </p>

              <div className="">
                <p>{moment(user?.regDate).add(1, "years").calendar()} </p>
                <p style={{ color: "rgb(227 227 227 / 70%)" }}>Due Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
