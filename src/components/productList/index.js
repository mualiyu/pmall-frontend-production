import * as React from "react";
import { useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from '@mui/icons-material/Groups';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import {Chart, ArcElement} from 'chart.js'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useRef } from 'react';
Chart.register(ArcElement);




const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '70%',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "product_image", label: "Image" },
  { id: "product_name", label: "Name" },
  { id: "product_category", label: "Category" },
  { id: "product_brand", label: "Brand" },
  { id: "cost_price", label: "Cost price" },
  { id: "selling_price", label: "Selling price" },
  { id: "stock", label: "Stock" },
  { id: "type", label: "Type" },
  { id: "date", label: "Date" },
  { id: "product_description", label: "Description" },
  { id: "status", label: "Status" },
];

const data = {
    datasets: [
      {
        data: [83, 20],
       
        backgroundColor: [
          'rgba(236, 112, 122, 1)',
          'rgba(16, 172, 126, 1)'
        ]
      },
    ],
  };

  var config = {        
    cutout: 28,
    responsive: true,
    maintainAspectRatio: true,
    options: {},
};



function createData(product_image, product_name,product_category, product_brand, selling_price,cost_price,stock,type,date,product_description, status, action) {
  return {product_image, product_name, product_category, product_brand, selling_price,cost_price,stock,type,date, product_description,status, action };
}

const ProductList = () => {
  const selectRef = useRef(null);

  const [newVendorModal, setNewVendorModal] = useState(false);
  const [applyProductDiscount, setApplyProductDiscount] = useState(false);
  const handleModalClose = () => setNewVendorModal(false);
  function handleSelectChange(event) {
    const selectedValue = selectRef.current.value;
    if(selectedValue == "Single product"){
      setApplyProductDiscount(true)
    }else{
      setApplyProductDiscount(false)
    }
}

  return (
    <section>
      <section className="page__header">
      <div className="flex-container alc">
      <GroupsIcon />
      <h3>Manage Products</h3>
        </div>
      </section>
      <div className="s-divider"></div>
      <section style={{display: 'flex'}}>
        <div className="stat m-10">
        <div className="left__stat py-32">
          <div>
              <Doughnut data={data} options={config} className="w80" />
          </div>
          <h3 className="stat__value ml-10">209
          <p className="sub__title">Total  Products</p> &nbsp; 
          </h3>

        </div>
        <div className="right__stat">
          <div className="right__sub s-divider">
            <h3 className="stat__value c-success">83</h3>
            <p className="sub__title">Published</p>
          </div>
          <div className="right__sub">
            <h3 className="stat__value c-error">20</h3>
            <p className="sub__title">Pending</p>
          </div>
        </div>
        </div>
      </section>

      <section className="flex-container alc p-y my-40">
        <div className="">
          <input
            type="text"
            className="search__bar"
            placeholder="Search by name or ID"
          />
          <select className="search__bar" defaultValue={'default'}>
            <option value="default"> Select Status</option>
            <option value="Status 1"> Status 1</option>
            <option value="Status 2"> Status 2</option>
            <option value="Status 3"> Status 3</option>
            <option value="Status 4"> Status 4</option>
          </select>
          <select className="search__bar" ref={selectRef} onChange={handleSelectChange} defaultValue={'default'}>
            <option value="default">Apply discount to</option>
            <option value="Single product"> Single product</option>
            <option value="Product Category">Product Category</option>
            <option value="All products"> All products</option>
          </select>
          {applyProductDiscount && (
               <span>
               <select className="search__bar" defaultValue={'default'}>
                 <option value="default">Select product</option>
                 <option value="Status 1">product 1</option>
                 <option value="Status 2">product 2</option>
                 <option value="Status 3"> product 3</option>
                 <option value="Status 3"> product 4</option>
                 <option value="Status 3"> product 5</option>
               </select>
               <select className="search__bar" defaultValue={'default'}>
                 <option value="default">Fixed Value</option>
                 <option value="Status 1">Percentage</option>
               </select>
               <input
               type="text"
               className="search__bar"
               placeholder="Discount amt"
             />
             </span>)
          }
        </div>
        <div className="">
          <button className="btn btn-primary p-25" onClick={() => setNewVendorModal(true)}>Apply</button>
        </div>
        {applyProductDiscount &&<div className="">
          <button className="btn btn-primary p-25" onClick={() => setNewVendorModal(true)}>Add product</button>
        </div>}
      </section>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Vendors Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>


      {/* Modal for vendors */}

      <Modal
          open={newVendorModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="mb-35">
              <Typography id="modal-modal-title">
                <h4 className="summary__title t-xl title-case">
                  Add Product
                </h4>
              </Typography>
              <div className="s-divider"></div>
            </div>
<section className="flex__normal">
  <div className="w-200">
    <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <button className="btn btn-primary p-25 mt-15">Upload Photo</button>
        
    </div>
    </div>
            <form style={{width: '100%'}} >
              
            <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> Product Name</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="ProductName"
                        placeholder="e.g IPhone 14"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Product Category</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Category</option>
                            <option value="Parent 1"> Category 1</option>
                            <option value="Parent 2"> Category 2</option>
                            <option value="Parent 3"> Category 3</option>
                            <option value="Parent 4"> Category 4</option>
                        </select>
                    </div>   
              </section>

              <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Product Brand</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Brand</option>
                            <option value="Parent 1"> Brand 1</option>
                            <option value="Parent 2"> Brand 2</option>
                            <option value="Parent 3"> Brand 3</option>
                            <option value="Parent 4"> Brand 4</option>
                        </select>
                    </div>   
                    <div className="pos-rel w100-m10 ">
                        <label>Selling Price</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="sellingPrice"
                        placeholder="1,150,000"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> Cost Price</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="costPrice"
                        placeholder="1,100,000"
                        />
                    </div>
                    
                    
              </section>
              <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                        <label className="">Schedule</label>
                        <input
                        type="date"
                        className="form-control-input "
                        name="schedule"
                        placeholder=""
                        />
                    </div>   
                    <div className="pos-rel w100-m10 ">
                        <label className="mb-7">Promotion</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Category 1</option>
                            <option value="Parent 1"> Brand 1</option>
                            <option value="Parent 2"> Brand 2</option>
                            <option value="Parent 3"> Brand 3</option>
                            <option value="Parent 4"> Brand 4</option>
                        </select>
                    </div>   
                    <div className="pos-rel w100-m10 ">
                        <label className="mb-7">Product Type</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Simple Product</option>
                            <option value="Parent 1"> Brand 1</option>
                            <option value="Parent 2"> Brand 2</option>
                            <option value="Parent 3"> Brand 3</option>
                            <option value="Parent 4"> Brand 4</option>
                        </select>
                    </div>   
              </section>
              <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                        <label className="">Product bar code id</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="sku"
                        placeholder="SKU-123456"
                        />
                    </div>   
                    <div className="pos-rel w100-m10 ">
                        <label className="mb-7">Stock Status</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default">In Stock</option>
                            <option value="Parent 1"> Brand 1</option>
                            <option value="Parent 2"> Brand 2</option>
                            <option value="Parent 3"> Brand 3</option>
                            <option value="Parent 4"> Brand 4</option>
                        </select>
                    </div>   
                </section>
                <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                        <label className="">Unit</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="unit"
                        placeholder="Pieces"
                        />
                    </div>   
                    <div className="pos-rel w100-m10 ">
                        <label className="mb-7">Quantity in Stock</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default">100</option>
                            <option value="Parent 1"> Brand 1</option>
                            <option value="Parent 2"> Brand 2</option>
                            <option value="Parent 3"> Brand 3</option>
                            <option value="Parent 4"> Brand 4</option>
                        </select>
                    </div>   
                </section>
              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
              <Stack spacing={3} sx={{ width: 500 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  // options={top100Films}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Tags"
                    />
                  )}
                />
              </Stack>
                </div>
              </section>
              <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                        <label>More Images</label>
                        <input
                        type="file"
                        className="form-control-input "
                        name="moreImages"
                        accept=".jpg,.png,.jpeg" 
                        multiple 
                        />
                    </div>
              </section>
              <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Product Description </label>
                        <textarea placeholder="Enter product description" className="form-textarea w-100"></textarea>
                    </div>
                    
                    <div className="pos-rel w100-m10"></div>
              </section>

<div className="flex__normal w-30 pull-right mt-35">
              <button onClick={handleModalClose} className="btn btn-secondary p-25 pull-right mr-10">
                Cancel
              </button>
              <button className="btn btn-primary p-25 pull-right">
                Save
              </button>
              </div>
            </form>
            </section>
          </Box>
        </Modal>

    </section>
  );
};

export default ProductList;