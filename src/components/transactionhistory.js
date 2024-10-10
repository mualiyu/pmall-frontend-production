import React, { useEffect, useState } from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const TransactionHistory = () => {
    const columns = [
        { id: "product_image", label: "Image" },
        { id: "product_name", label: "Name" },
        { id: "product_category", label: "Category" },
        { id: "product_brand", label: "Brand" },
        { id: "payment_method", label: "Payment Method" },
        { id: "amount", label: "Amount" },
        { id: "date", label: "Date" },
        { id: "product_description", label: "Description" },
        { id: "status", label: "Status" },
      ];

  return (
    <div className='t-history'>
      <h2>Transaction History</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} size="small" aria-label="Vendors Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <img src="/Screenshot 2024-03-19 154643.png" className="w30"/>
                </div>
              </TableCell>
              <TableCell>IPhone 14</TableCell>
              <TableCell> Phones </TableCell>
              <TableCell> IPhone </TableCell>
              <TableCell> Credit Card </TableCell>
              <TableCell> 1,200,000 </TableCell>
              <TableCell>19/05/2023 </TableCell>
              <TableCell> A clean IPhone 14 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">Success</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <img src="/Screenshot 2024-03-19 154643.png" className="w30"/>
                </div>
              </TableCell>
              <TableCell> Mucinex </TableCell>
              <TableCell> Cough </TableCell>
              <TableCell> Peace </TableCell>
              <TableCell> Credit Card </TableCell>
              <TableCell> 300,000 </TableCell>
              <TableCell>19/05/2023 </TableCell>
              <TableCell> Perfect drug for your cough </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Failed </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>

            <TableRow>
            <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                <img src="/Screenshot 2024-03-19 154643.png" className="w30"/>
                </div>
              </TableCell>
              <TableCell> Fridge </TableCell>
              <TableCell> Home electronics</TableCell>
              <TableCell> Thermocool</TableCell>
              <TableCell> Credit Card </TableCell>
              <TableCell> 200,000 </TableCell>
              <TableCell>19/05/2023 </TableCell>
              <TableCell>Long lasting fridge for preservating</TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error"> Failed </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                <img src="/Screenshot 2024-03-19 154643.png" className="w30"/>
                </div>
              </TableCell>
              <TableCell> Android television </TableCell>
              <TableCell> Home electronics</TableCell>
              <TableCell> Samsung </TableCell>
              <TableCell>  Credit Card  </TableCell>
              <TableCell> 400,000 </TableCell>
              <TableCell>19/05/2023 </TableCell>
              <TableCell> Android smart tv to watch your favorites </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Failed</span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                <img src="/Screenshot 2024-03-19 154643.png" className="w30"/>
                </div>
              </TableCell>
              <TableCell>IPhone 11 </TableCell>
              <TableCell> Phones </TableCell>
              <TableCell> IPhone </TableCell>
              <TableCell> Credit Card </TableCell>
              <TableCell> 450,000 </TableCell>
              <TableCell>19/05/2023 </TableCell>
              <TableCell> A brand new IPhone 11 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">Success</span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default TransactionHistory;
