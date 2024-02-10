import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const OrderDetails= () => {
    const galleryImages = [
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
    ]
    const columns = [
        { id: "image", label: "Image" },
        { id: "name", label: "Name" },
        { id: "quantity", label: "Quantity" },
        { id: "price", label: "Price" },
      ];
    return ( 
        <section className=" w-full" style={{display:"block"}}>
            <div className="order-summary">
                <div className="page__header">
                    <h1>Order #123783</h1>
                </div>
            
                <div className="flex-container w-full p-y my-40 g-40">
                    <div className="left w-full flex flex-col g-20 ">
                        <div className='flex justsb alc sort'>
                            <p>File</p>
                            <div className='flex alc g-10'>
                                <select name="" id="">
                                    <option value="1">Sort</option>
                                </select>  
                            </div>
                        </div>
                       
                            <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="Vendors Table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                    {galleryImages.map(details => (
                         <TableRow>
                            <TableCell className="b-r">
                                <div className="d-flex alc f-10 flex-start">
                                <img src={details.image} className="w30"/>
                                </div>
                            </TableCell>
                            <TableCell>{details.name}</TableCell>
                            <TableCell>
                                <div className='flex alc g-5'>
                                    <p>-</p>
                                    <p>{details.quantity} </p>
                                    <p>+</p>
                                </div> 
                            </TableCell>
                            <TableCell>&#x20A6;{details.price}</TableCell>
                            <TableCell>
                            {" "}
                            <DeleteOutlineOutlinedIcon />{" "}
                            </TableCell>
                       </TableRow>
                    ))}
               
              </TableBody>
            </Table>
                </TableContainer>
                        
                    </div>
                    <div className=" right flex flex-col g-20 w-400">
                        <div className="flex flex-col g-20">
                            <p className='bold'>Summary</p>
                            <div className=" flex g-5 img-detail underline">
                                <p className='bold'>Order id</p>
                                <p>#123823</p>
                            </div>
                            <div className=" flex  g-5 img-detail underline">
                                <p className='bold'>Date</p>
                                <p>20 Nov, 2023</p>
                            </div>
                            <div className=" flex g-5 img-detail underline">
                                <p className='bold'>Total</p>
                                <p>$948.5</p>
                            </div>
                        </div>
                        <div className='backshadow flex flex-col g-5'>
                            <p className='bold'>Shipping Address</p>
                            <p>3157 W. grey St. Utica, pennyslyvania 57867</p>
                        </div>
                        <div className='backshadow flex flex-col g-5'>
                            <p className='bold'>Payment Method</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae accusamus aperiam eveniet eaque labore perspiciatis officiis recusandae quisquam fugit vero dolores provident praesentium quas temporibus inventore est facilis, beatae at.</p>
                        </div>
                        <div className='backshadow flex flex-col g-5'>
                            <p className='bold'>Expected Date of Delivery</p>
                            <p>20 Nov, 2023</p>
                            <div className='flex track-btn all-center'>
                                <LocalShippingOutlinedIcon  />
                                <p>Track order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
} 
 
export default OrderDetails;