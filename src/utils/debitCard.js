<<<<<<< HEAD
import React from "react";
import "../index.css";
// import "./debitCard.css";
// import "../debitCard.css";

export default function DebitCard(props) {
  return (
    <div class="debit_card_container">
      <div class="debit_card">
        <div class="debit_card-inner">
          <div class="debit_card_front">
            <img
              src="https://i.ibb.co/PYss3yv/map.png"
              class="map-img"
              alt="Pmall"
              style={{ opacity: "0.1" }}
            />
            <div class="row">
=======
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
>>>>>>> 4202f51663fab617a3d00f26f63f63954a4b9731
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
<<<<<<< HEAD
            <div class="row card-no">
              <p style={{ fontSize: 18 }}>1234567891011213</p>
            </div>
            <div class="row debit_card_name">
              <p>AHMED PETER</p>
              <p>01 / 25</p>
=======
            <div className="row card-no">
              <p style={{ fontSize: 18 }}>{user?.refId}</p>
            </div>
            <div className="row debit_card_name">
              <p style={{ textTransform: "capitalize" }}>
                {user?.storeName
                  ? user?.storeName
                  : user?.fname + " " + user?.lname}
              </p>

              <div className="">
                <p>{moment(user?.regDate).add(1, "years").calendar()} </p>
                <p style={{ color: "rgb(227 227 227 / 70%)" }}>Due Next</p>
              </div>
>>>>>>> 4202f51663fab617a3d00f26f63f63954a4b9731
            </div>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 4202f51663fab617a3d00f26f63f63954a4b9731
