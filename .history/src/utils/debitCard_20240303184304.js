import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import "../index.css";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
// import "./debitCard.css";
// import "../debitCard.css";

export default function DebitCard(props) {
  // const { user } = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the user token from local storage or wherever it's stored
    const token = localStorage.getItem("authToken");
    console.log(token);
    if (token) {
      // Decode the token and set the user state
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
    console.log(user);
  }, [user]);

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
            <div class="row card-no">
              <p style={{ fontSize: 18 }}>1234567891011213</p>
            </div>
            <div class="row debit_card_name">
              <p>{user?.storeName}</p>
              <p>01 / 25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
