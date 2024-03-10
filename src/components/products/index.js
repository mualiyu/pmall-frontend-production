import * as React from "react";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import { Chart, ArcElement } from "chart.js";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useVendor } from "../../context/VendorSignupContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from "../../context/UserContext";
import moment from "moment";
Chart.register(ArcElement);

const top100Films = [
  { title: "Beauty" },
  { title: "Phones" },
  { title: "Gadgets" },
  { title: "Electronics", year: 2008 },
  { title: "Makeup", year: 1957 },
  { title: "Cough", year: 1993 },
  { title: " Summer", year: 1994 },
  { title: "Clothing", year: 2001 },
  { title: "Ceramics", year: 1971 },
  { title: "Footwear", year: 2007 },
  { title: "Foodstuff", year: 1976 },
  { title: "Toys", year: 1962 },
  { title: "Children", year: 1944 },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "product_image", label: "Product Image" },
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "brand", label: "Brand" },
  { id: "cost_price", label: "Cost Price" },
  { id: "selling_price", label: "Selling Price" },
  { id: "inStock", label: "In Stock" },
  { id: "created_at,", label: "Created At" },
  { id: "status", label: "Status" },
];

const categoryColumns = [
  { id: "category_image", label: "Category Image" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "created_at,", label: "Created At" },
];

const brandColumns = [
  { id: "brand_image", label: "Brand Image" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "created_at,", label: "Created At" },
];

const data = {
  datasets: [
    {
      data: [83, 20],

      backgroundColor: ["rgba(236, 112, 122, 1)", "rgba(16, 172, 126, 1)"],
    },
  ],
};

var config = {
  cutout: 28,
  responsive: true,
  maintainAspectRatio: true,
  options: {},
};

function createData(
  product_image,
  name,
  brand,
  selling_price,
  created_at,
  status,
  action
) {
  return {
    product_image,
    name,
    brand,
    selling_price,
    created_at,
    status,
    action,
  };
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductList = () => {
  const [products, setProducts] = useState();
  const [newProduct, setNewProduct] = useState();
  const [value, setValue] = useState(0);
  const [pmallUsers, setPmallUsers] = useState([]);
  const { user } = useUser();
  const {inputValues, setState, onChangeHandler} = useVendor();
  const handleChange = (event, newValue) => {
    const selectedTitles = newValue.map((tag) => tag.title).join(', '); // Join titles with comma
    console.log(selectedTitles); // Update state with comma-separated string
    setState((inputValues) => ({
      ...inputValues,
      tags: selectedTitles,
    }));
  };
  const [newProductModal, setNewProductModal] = useState(false);
  const  [newCategoryModal, setNewCategoryModal] = useState(false);
  const  [newBrandModal, setNewBrandModal] = useState(false);
  const handleModalClose = () => setNewProductModal(false);
  const handleCategoryModalClose = () => setNewCategoryModal(false);
  const handleBrandModalClose = () => setNewBrandModal(false);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const VendorCreateProduct = async(e) => {
    if (e) {
      e.preventDefault(); 
      //inputValues.image = "ihjsdjhbknmkl"
    try {
      const response = await fetch('https://test.igeecloset.com/api/v1/products/create', {
        method: 'POST',
        headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" ,
          'Authorization': `Bearer ${user?.token}`
        },
          body:JSON.stringify(inputValues)
      });
  console.log(inputValues)
      if (response.ok) {
        const data = await response.json();
        console.log('product:', data); 
        setNewProduct(data)
        handleModalClose()
      } else {
        const error = await response.text();
        console.error('Error posting product:', error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  };

  let publishedCount = 0;


  const getProducts = () => {
    fetch("https://test.igeecloset.com/api/v1/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result.data);
        setProducts(result.data);
        for (const item of result) {
          if (item.status === 0) {
            publishedCount++;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCommasToNumberString = (numberString) =>{
    return  numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }

  React.useEffect(() => {
    getProducts ();
    console.log(publishedCount)
  }, [newProduct]);
  return (
    <section>
      <section className="page__header">
        <div className="flex-container alc">
          <ShoppingCartIcon />
          <h3>Manage Products</h3>
        </div>
      </section>
      <div className="s-divider"></div>
      <section style={{ display: "flex" }}>
        <div className="stat m-10">
          <div className="left__stat py-32">
            <div>
              <Doughnut data={data} options={config} className="w80" />
            </div>
            <h3 className="stat__value ml-10">
              {products?.length}
              <p className="sub__title">Total Products</p> &nbsp;
            </h3>
          </div>
          <div className="right__stat">
            <div className="right__sub s-divider">
              <h3 className="stat__value c-success">{publishedCount}</h3>
              <p className="sub__title">Published</p>
            </div>
            <div className="right__sub">
              <h3 className="stat__value c-error">{products?.length - publishedCount}</h3>
              <p className="sub__title">Pending</p>
            </div>
          </div>
        </div>
      </section>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example">
                  <Tab label="Products list" {...a11yProps(0)} />
                  <Tab label="Categories" {...a11yProps(1)} />
                  <Tab label="Brands" {...a11yProps(2)} />
            </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <section className="flex-container alc p-y my-40">
          <div className="">
            <input
              type="text"
              className="search__bar w-200"
              placeholder="Search by name or ID"
            />
            <select className="search__bar w-200" defaultValue={"default"}>
              <option value="default"> Select Status</option>
              <option value="Status 1"> Status 1</option>
              <option value="Status 2"> Status 2</option>
              <option value="Status 3"> Status 3</option>
              <option value="Status 4"> Status 4</option>
            </select>
          </div>
          <div className="">
            <button
              className="btn btn-primary p-25"
              onClick={() => setNewProductModal(true)}>
              Add product
            </button>
          </div>
        </section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="Porduct Table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.map((product, index) => (                   
                <TableRow key={product.id} onClick={() => navigate(`/app/products/details/${product.id}`)}>
                <TableCell className="b-r">
                  <div className="d-flex alc f-10 flex-start">
                    <div className="product__avatar avatar__large bg-success">
                      <img src={product.image} alt="" className="w50"/>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="lheight13">
                    <h4 className="f-300">{product.name} </h4>
                  </div>
                </TableCell>
                <TableCell>{product.category_id}</TableCell>
                <TableCell> {product.brand_id} </TableCell>
                <TableCell> &#x20A6;{addCommasToNumberString(product.cost_price)} </TableCell>
                <TableCell> &#x20A6;{addCommasToNumberString(product.selling_price)} </TableCell>
                <TableCell> {product.inStock} </TableCell>
                <TableCell> {moment(product.created_at).add(1, "years").calendar()} </TableCell>
                <TableCell>
                  {" "}
                  {product.status == 1 ?
                  <span className="badge bg-success">Published</span>
                  : <span className="badge bg-success">unPublished</span>
                  }
                </TableCell>
                <TableCell>
                  {" "}
                  <EditIcon />{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <DeleteIcon/>{" "}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <section className="flex-container alc p-y my-40">
          <div className="w-full">
            <button
              className="btn btn-primary p-25 pull-right"
              onClick={() => setNewCategoryModal(true)}>
              Add Category
            </button>
          </div>
        </section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="Porduct Table">
            <TableHead>
              <TableRow>
                {categoryColumns.map((column) => (
                  <TableCell>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.map((product, index) => (                   
                <TableRow key={product.id} onClick={() => navigate(`/app/products/details/${product.id}`)}>
                <TableCell className="b-r">
                  <div className="d-flex alc f-10 flex-start">
                    <div className="product__avatar avatar__large bg-success">
                      <img src={product.image} alt="" className="w50"/>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <h4 className="f-300">Category name </h4>
                </TableCell>
                <TableCell>Category description</TableCell>
                <TableCell> {moment(product.created_at).add(1, "years").calendar()} </TableCell>
                <TableCell>
                  {" "}
                  <EditIcon />{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <DeleteIcon/>{" "}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <section className="flex-container alc p-y my-40">
          <div className="w-full">
            <button
              className="btn btn-primary p-25 pull-right"
              onClick={() => setNewBrandModal(true)}>
              Add Brand
            </button>
          </div>
        </section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="Porduct Table">
            <TableHead>
              <TableRow>
                {brandColumns.map((column) => (
                  <TableCell>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.map((product, index) => (                   
                <TableRow key={product.id} onClick={() => navigate(`/app/products/details/${product.id}`)}>
                <TableCell className="b-r">
                  <div className="d-flex alc f-10 flex-start">
                    <div className="product__avatar avatar__large bg-success">
                      <img src={product.image} alt="" className="w50"/>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <h4 className="f-300">Brand name </h4>
                </TableCell>
                <TableCell>Brand description</TableCell>
                <TableCell> {moment(product.created_at).add(1, "years").calendar()} </TableCell>
                <TableCell>
                  {" "}
                  <EditIcon />{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <DeleteIcon/>{" "}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      {/* Modal for vendors */}

      <Modal
        open={newProductModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Product</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-200">
              <div className="profile_pic_holder">
                <img src={profile} className="profile_pic" name="image" value={inputValues.image|| ""} />
                <div className="pos-rel w100-m10 ">
                  <input
                    type="file"
                    className="form-control-input no-border"
                    name="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      // if (selectedName == "") {
                      //   setAlert("Please Select a file name");
                      //   return;
                      // }
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        "https://test.igeecloset.com/api/v1/products/upload-file",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            image: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                  />
                </div>
                {/* <button className="btn btn-primary p-25 mt-15" onClick={uploadFile}>
                  Upload Photo
                </button> */}
              </div>
            </div>
            <form style={{ width: "100%" }}>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Product Name</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="name"
                    placeholder="e.g IPhone 14"
                    onChange={onChangeHandler}
                    value={inputValues.name || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Category</label>
                  <select
                    className="search__bar w-100"
                    value={inputValues.category_id || ""}
                    name="category_id"
                    onChange={onChangeHandler}
                    >
                    <option value="default"> Select Category</option>
                    <option value="1"> Category 1</option>
                    <option value="2"> Category 2</option>
                    <option value="3"> Category 3</option>
                    <option value="4"> Category 4</option>
                  </select>
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Brand</label>
                  <select
                    className="search__bar w-100"
                    name="brand_id"
                    value={inputValues.brand_id || ""}
                    onChange={onChangeHandler}
                    >
                    <option value="default"> Select Brand</option>
                    <option value="1"> Brand 1</option>
                    <option value="2"> Brand 2</option>
                    <option value="3"> Brand 3</option>
                    <option value="4"> Brand 4</option>
                  </select>
                </div>

                <div className="pos-rel w100-m10 ">
                  <label> Cost Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="cost_price"
                    placeholder="1,500"
                    onChange={onChangeHandler}
                    value={inputValues.cost_price || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>Selling Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="selling_price"
                    placeholder="1,200"
                    onChange={onChangeHandler}
                    value={inputValues.selling_price || ""}
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                  <label> In stock</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="inStock"
                    placeholder="1,500"
                    onChange={onChangeHandler}
                    value={inputValues.inStock || ""}
                  />
                </div>

                <div className="pos-rel w100-m10 ">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="quantity"
                    placeholder="1,500"
                    onChange={onChangeHandler}
                    value={inputValues.quantity || ""}
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label>Add Tags</label>
                  <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={top100Films}
                      name="tags"
                      onChange={handleChange}
                     // value={inputValues.tags || ""}
                      getOptionLabel={(option) => option.title}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField {...params} placeholder="New tag" />
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
                    className="form-control-input no-border"
                    name="more_images"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        "https://test.igeecloset.com/api/v1/products/upload-file",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            more_images: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                    multiple
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Description </label>
                  <textarea
                    placeholder="Enter product description"
                    className="form-textarea w-100"
                    name="description"
                    onChange={onChangeHandler}
                    value={inputValues.description || ""}
                    ></textarea>
                </div>

                <div className="pos-rel w100-m10"></div>
              </section>

              <div className="flex__normal w-30 pull-right mt-35">
                <button
                  onClick={handleModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button className="btn btn-primary p-25 pull-right" onClick={ VendorCreateProduct}>
                  Save
                </button>
              </div>
            </form>
          </section>
        </Box>
      </Modal>

      <Modal
        open={newCategoryModal}
        onClose={handleCategoryModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Product</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-200">
              <div className="profile_pic_holder">
                <img src={profile} className="profile_pic" name="image" value={inputValues.image|| ""} />
                <div className="pos-rel w100-m10 ">
                  <input
                    type="file"
                    className="form-control-input no-border"
                    name="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      // if (selectedName == "") {
                      //   setAlert("Please Select a file name");
                      //   return;
                      // }
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        "https://test.igeecloset.com/api/v1/products/upload-file",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            image: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                  />
                </div>
                {/* <button className="btn btn-primary p-25 mt-15" onClick={uploadFile}>
                  Upload Photo
                </button> */}
              </div>
            </div>
            <section className="flex-container flex-col g-20 mb-lg w-full">
              <form className="flex-container flex-col g-20 mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Category Name</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="name"
                    placeholder="e.g IPhone 14"
                    onChange={onChangeHandler}
                    value={inputValues.name || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7">Category description</label>
                  <textarea
                    className="search__bar w-100"
                    value={inputValues.description|| ""}
                    name="description"
                    rows={6}
                    onChange={onChangeHandler}
                    >
                  </textarea>
                </div>
                <div className="flex__normal mt-10 w-full ">
                  <button className="btn btn-primary p-25 pull-right">
                    Create Category
                  </button>
                </div>
              </form>
            </section>
          </section>
        </Box>
      </Modal>

      <Modal
        open={newBrandModal}
        onClose={handleBrandModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Brand</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-200">
              <div className="profile_pic_holder">
                <img src={profile} className="profile_pic" name="image" value={inputValues.image|| ""} />
                <div className="pos-rel w100-m10 ">
                  <input
                    type="file"
                    className="form-control-input no-border"
                    name="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      // if (selectedName == "") {
                      //   setAlert("Please Select a file name");
                      //   return;
                      // }
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        "https://test.igeecloset.com/api/v1/products/upload-file",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            image: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                  />
                </div>
                {/* <button className="btn btn-primary p-25 mt-15" onClick={uploadFile}>
                  Upload Photo
                </button> */}
              </div>
            </div>
            <section className="flex-container flex-col g-20 mb-lg w-full">
              <form className="flex-container flex-col g-20 mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Brand Name</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="name"
                    placeholder="e.g IPhone 14"
                    onChange={onChangeHandler}
                    value={inputValues.name || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7">Brand description</label>
                  <textarea
                    className="search__bar w-100"
                    value={inputValues.description|| ""}
                    name="description"
                    rows={6}
                    onChange={onChangeHandler}
                    >
                  </textarea>
                </div>
                <div className="flex__normal mt-10 w-full ">
                  <button className="btn btn-primary p-25 pull-right">
                    Create Brand
                  </button>
                </div>
              </form>
            </section>
          </section>
        </Box>
      </Modal>
    </section>
  );
};

export default ProductList;
