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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
Chart.register(ArcElement);

const top100Films = [
  { title: 'Beauty',},
  { title: 'Phones'},
  { title: 'Gadgets'},
  { title: 'Electronics', year: 2008 },
  { title: 'Makeup', year: 1957 },
  { title: "Cough", year: 1993 },
  { title: ' Summer', year: 1994 },
  { title: 'Clothing', year: 2001 },
  { title: 'Ceramics', year: 1971 },
  { title: 'Footwear', year: 2007 },
  { title: 'Foodstuff', year: 1976 },
  { title: 'Toys', year: 1962 },
  { title: 'Children', year: 1944 },
];


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
  { id: "ref", label: "Ref" },
  { id: "vendor", label: "Vendor" },
  { id: "item", label: "Item" },
  { id: "product_cost", label: "Product Cost" },
  { id: "customer_name", label: "Customer Name" },
  { id: "status", label: "Status" },
  { id: "payment", label: "Payment" },
  { id: "date", label: "Date" },
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


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }  



function createData(ref, vendor,item, product_cost,customer_name, status,payment, date, action) {
  return {ref, vendor,item, product_cost,customer_name, status,payment, date, action };
}

const OrderManagement = () => {
  const [newVendorModal, setNewVendorModal] = useState(false);
  const handleModalClose = () => setNewVendorModal(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section>
      <section className="page__header">
      <div className="flex-container alc">
      <GroupsIcon />
      <h3>Order Details</h3>
        </div>
      </section>
      <div className="s-divider"></div>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Orders" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
          <Tab label="Pending" {...a11yProps(2)} />
          <Tab label="Delievered" {...a11yProps(3)} />
          <Tab label="Cancelled" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <section className="flex-container alc p-y my-40">
        <div className="">
          <input
            type="text"
            className="search__bar w-200"
            placeholder="Search by name or ID"
          />
          <select className="search__bar w-200" defaultValue={'default'}>
            <option value="default"> Select Status</option>
            <option value="Status 1"> Status 1</option>
            <option value="Status 2"> Status 2</option>
            <option value="Status 3"> Status 3</option>
            <option value="Status 4"> Status 4</option>
          </select>
        </div>
        <div className="">
          <button className="btn btn-primary p-25" onClick={() => setNewVendorModal(true)}>Add product</button>
        </div>
      </section>
      <TabPanel value={value} index={0}>
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
                <TableRow>
                <TableCell className="b-r">Adf908</TableCell>
                <TableCell>Philip Yahaya</TableCell>
                <TableCell> Puma Bag </TableCell>
                <TableCell> $200 </TableCell>
                <TableCell> Dada Philip </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-success">Completed</span>{" "}
                </TableCell>
                <TableCell> Credit Card </TableCell>
                <TableCell> Jan 3, 2001 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="b-r">EPT708</TableCell>
                <TableCell>Bello Joseph</TableCell>
                <TableCell> Gucci Shoe </TableCell>
                <TableCell> $1000 </TableCell>
                <TableCell> Bolu Stephen </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-warning">pending</span>{" "}
                </TableCell>
                <TableCell> Bank Transfer </TableCell>
                <TableCell> Jun 13, 2006 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell className="b-r">HAS084</TableCell>
                <TableCell>Bisi Anjola</TableCell>
                <TableCell>Wig </TableCell>
                <TableCell> $350 </TableCell>
                <TableCell> Ashien Benedict </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-error">Cancelled</span>{" "}
                </TableCell>
                <TableCell> Paypal </TableCell>
                <TableCell> Nov 11, 2021 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="b-r">Adf908</TableCell>
                <TableCell>Philip Yahaya</TableCell>
                <TableCell> Puma Bag </TableCell>
                <TableCell> $200 </TableCell>
                <TableCell> Ogunbure Busayo </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-success">Completed</span>{" "}
                </TableCell>
                <TableCell> Credit Card </TableCell>
                <TableCell> Jan 3, 2001 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="b-r">EPT708</TableCell>
                <TableCell>Bello Joseph</TableCell>
                <TableCell> Gucci Shoe </TableCell>
                <TableCell> $1000 </TableCell>
                <TableCell> Oladeji Ife </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-warning">pending</span>{" "}
                </TableCell>
                <TableCell> Bank Transfer </TableCell>
                <TableCell> Jun 13, 2006 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="b-r">Adf908</TableCell>
                <TableCell>Philip Yahaya</TableCell>
                <TableCell> Puma Bag </TableCell>
                <TableCell> $200 </TableCell>
                <TableCell> Bodunde Donald</TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-success">Completed</span>{" "}
                </TableCell>
                <TableCell> Credit Card </TableCell>
                <TableCell> Jan 3, 2001 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="b-r">EPT708</TableCell>
                <TableCell>Bello Joseph</TableCell>
                <TableCell> Gucci Shoe </TableCell>
                <TableCell> $1000 </TableCell>
                <TableCell> Dada Philip </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-warning">pending</span>{" "}
                </TableCell>
                <TableCell> Bank Transfer </TableCell>
                <TableCell> Jun 13, 2006 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell className="b-r">HAS084</TableCell>
                <TableCell>Bisi Anjola</TableCell>
                <TableCell>Wig </TableCell>
                <TableCell> $350 </TableCell>
                <TableCell> Ajala Cusko </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-error">Cancelled</span>{" "}
                </TableCell>
                <TableCell> Paypal </TableCell>
                <TableCell> Nov 11, 2021 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="b-r">Adf908</TableCell>
                <TableCell>Philip Yahaya</TableCell>
                <TableCell> Puma Bag </TableCell>
                <TableCell> $200 </TableCell>
                <TableCell> Ono Joshua </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-success">Completed</span>{" "}
                </TableCell>
                <TableCell> Credit Card </TableCell>
                <TableCell> Jan 3, 2001 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="b-r">EPT708</TableCell>
                <TableCell>Bello Joseph</TableCell>
                <TableCell> Gucci Shoe </TableCell>
                <TableCell> $1000 </TableCell>
                <TableCell> Babatunde Michael </TableCell>
                <TableCell>
                    {" "}
                    <span className="badge bg-warning">pending</span>{" "}
                </TableCell>
                <TableCell> Bank Transfer </TableCell>
                <TableCell> Jun 13, 2006 </TableCell>
                <TableCell>
                    {" "}
                    <MoreVertIcon />{" "}
                </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Completed
      </TabPanel>
      <TabPanel value={value} index={2}>
        Pending
      </TabPanel>
      <TabPanel value={value} index={3}>
        Delievered
      </TabPanel>
      <TabPanel value={value} index={4}>
        Cancelled
      </TabPanel>
    </Box>


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
                  Add Vendor
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
              <Stack spacing={3} sx={{ width: 500 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={top100Films}
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

export default OrderManagement;
