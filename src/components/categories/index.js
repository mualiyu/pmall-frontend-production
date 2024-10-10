// import * as React from "react";
import * as React from "react";
import { useState} from "react";
import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import profile from "../../assets/imgs/passport.png";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";


const Categories = () => {
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
        { id: "thumbnail", label: "Thumbnail" },
        { id: "name", label: "Name" },
        { id: "slug", label: "Slug" },
        { id: "parent_category", label: "Parent Category" },
        { id: "display_type", label: "Display Type" },
        { id: "description", label: "Description" },
        { id: "status", label: "Status" },
      ];
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
      const [value, setValue] = useState(0);
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
      const [newVendorModal, setNewVendorModal] = useState(false);
      const handleModalClose = () => setNewVendorModal(false);
    return ( 
        <div className="f p-y my-20">
            <div className="flex g-0">
                <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Categories" {...a11yProps(0)} />
                    <Tab label="Tags" {...a11yProps(1)} />
                    <Tab label="Brands" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="w-full flex flex-col g-20 items-center">
                        <div className="w-full">
                            <button className="btn btn-primary p-25 mt-15 flt-right" onClick={()=>setNewVendorModal(true)}>Add new category</button>
                        </div>
                
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
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell>IPhone 14</TableCell>
                                    <TableCell> Phones </TableCell>
                                    <TableCell> IPhone </TableCell>
                                    <TableCell> A clean IPhone 14 </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-success">Published</span>{" "}
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell> Mucinex </TableCell>
                                    <TableCell> Cough </TableCell>
                                    <TableCell> Peace </TableCell>
                                    <TableCell> Perfect drug for your cough </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-error">Pending </span>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell> Fridge </TableCell>
                                    <TableCell> Home electronics</TableCell>
                                    <TableCell> Thermocool</TableCell>
                                    <TableCell>Long lasting fridge for preservating</TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-error"> Pending </span>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell> Android television </TableCell>
                                    <TableCell> Home electronics</TableCell>
                                    <TableCell> Samsung </TableCell>
                                    <TableCell> Android smart tv to watch your favorites </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-error">Pending </span>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell>IPhone 11 </TableCell>
                                    <TableCell> Phones </TableCell>
                                    <TableCell> IPhone </TableCell>
                                    <TableCell> A brand new IPhone 11 </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-success">Published </span>
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="w-full flex flex-col g-20 items-center">
                        <div className="w-full">
                        <button className="btn btn-primary p-25 mt-15 flt-right" onClick={()=>setNewVendorModal(true)}>Add new tag</button>
                        </div>
                
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
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell>IPhone 14</TableCell>
                                    <TableCell> Phones </TableCell>
                                    <TableCell> IPhone </TableCell>
                                    <TableCell> A clean IPhone 14 </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-success">Published</span>{" "}
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell> Mucinex </TableCell>
                                    <TableCell> Cough </TableCell>
                                    <TableCell> Peace </TableCell>
                                    <TableCell> Perfect drug for your cough </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-error">Pending </span>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell> Fridge </TableCell>
                                    <TableCell> Home electronics</TableCell>
                                    <TableCell> Thermocool</TableCell>
                                    <TableCell>Long lasting fridge for preservating</TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-error"> Pending </span>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell> Android television </TableCell>
                                    <TableCell> Home electronics</TableCell>
                                    <TableCell> Samsung </TableCell>
                                    <TableCell> Android smart tv to watch your favorites </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-error">Pending </span>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <MoreVertIcon />{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="b-r">
                                        <div className="d-flex alc f-10 flex-start">
                                        <img src={profile} className="w30"/>
                                        </div>
                                    </TableCell>
                                    <TableCell>IPhone 11 </TableCell>
                                    <TableCell> Phones </TableCell>
                                    <TableCell> IPhone </TableCell>
                                    <TableCell> A brand new IPhone 11 </TableCell>
                                    <TableCell>
                                        {" "}
                                        <span className="badge bg-success">Published </span>
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
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Brand
                </TabPanel>
                </Box>
            </div>
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
                        Add Category
                        </h4>
                    </Typography>
                    <div className="s-divider"></div>
                    </div>
                    <section className="flex__normal">
                        <div className="w-200">
                            <div className="profile_pic_holder b-round">
                                <img src={profile} className="profile_pic b-round"/>
                                <button className="btn btn-primary p-25 mt-15">Upload Thumbnail</button>
                                
                            </div>
                        </div>
                        <form style={{width: '100%'}} >
                        
                        <section className="flex-container mb-lg">
                            <div className="pos-rel w100-m10 ">
                                    <label>Name</label>
                                    <input
                                    type="text"
                                    className="form-control-input "
                                    name="username"
                                    placeholder="e.g Adamu"
                                    />
                                </div>
                                <div className="pos-rel w100-m10 ">
                                    <label> Slug</label>
                                    <input
                                    type="text"
                                    className="form-control-input "
                                    name="username"
                                    placeholder="e.g Norris"
                                    />
                                </div>
                        </section>
                       
                        <section className="flex-container mb-lg">
                                <div className="pos-rel w100-m10 ">
                                <label className="mb-7"> Parent Category</label>
                                    <select className="search__bar w-100" defaultValue={'default'}>
                                        <option value="default"> None</option>
                                        <option value="State 1"> State 1</option>
                                        <option value="State 2"> State 2</option>
                                        <option value="State 3"> State 3</option>
                                        <option value="State 4"> State 4</option>
                                    </select>
                                </div>
                                <div className="pos-rel w100-m10 ">
                                <label className="mb-7">Display type</label>
                                    <select className="search__bar w-100" defaultValue={'default'}>
                                        <option value="default">Default</option>
                                        <option value="LGA 1"> LGA 1</option>
                                        <option value="LGA 2"> LGA 2</option>
                                        <option value="LGA 3"> LGA 3</option>
                                        <option value="LGA 4"> LGA 4</option>
                                    </select>
                                </div>
                        </section>
                        <section className="flex-container mb-lg">
                                <div className="pos-rel w100-m10 ">
                                <label className="mb-7"> Description</label>
                                    <textarea placeholder="Enter description" className="form-textarea w-100"></textarea>
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
        </div>
     );
}
 
export default Categories;