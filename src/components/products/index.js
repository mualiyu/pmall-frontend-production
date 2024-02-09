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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
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
  // { id: "category", label: "Category" },
  { id: "brand", label: "Brand" },
  { id: "selling_price", label: "Price" },
  { id: "created_at,", label: "Created At" },
  { id: "status", label: "Status" },
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

const ProductList = () => {
  const [newProductModal, setNewProductModal] = useState(false);
  const handleModalClose = () => setNewProductModal(false);
  const navigate = useNavigate();
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
              209
              <p className="sub__title">Total Products</p> &nbsp;
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
            <TableRow onClick={() => navigate("details")}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="product__avatar avatar__large bg-success">
                    <h3>AP</h3>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="lheight13">
                  <h4 className="f-300">Iphone 14 Pro Max </h4>
                  <p className="sub__title">Product Category</p>
                </div>
              </TableCell>
              <TableCell> IPhone </TableCell>
              <TableCell> 1,100,000 </TableCell>
              <TableCell> June 12, 2005 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">Published</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow onClick={() => navigate("details")}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="product__avatar bg-error">
                    <h3>PY</h3>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="lheight13">
                  <h4 className="f-300">Philip Yahaya</h4>
                  <p className="sub__title">Product Category</p>
                </div>
              </TableCell>
              <TableCell> Cough </TableCell>
              <TableCell> 200,000 </TableCell>
              <TableCell> June 12, 2005 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Pending </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>

            <TableRow onClick={() => navigate("details")}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="product__avatar bg-success">
                    <h3>PY</h3>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="lheight13">
                  <h4 className="f-300">Philip Yahaya</h4>
                  <p className="sub__title">Product Category</p>
                </div>{" "}
              </TableCell>
              <TableCell> Thermocool</TableCell>
              <TableCell> 150,000 </TableCell>
              <TableCell> June 12, 2005 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error"> Pending </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow onClick={() => navigate("details")}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="product__avatar bg-warning">
                    <h3>DA</h3>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="lheight13">
                  <h4 className="f-300">Dennis Abdulmalik</h4>
                  <p className="sub__title">Product Category</p>
                </div>
              </TableCell>
              <TableCell> Home electronics</TableCell>
              <TableCell> 390,000 </TableCell>
              <TableCell> June 12, 2005 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Pending </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow onClick={() => navigate("details")}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="product__avatar bg-error">
                    <h3>MS</h3>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="lheight13">
                  <h4 className="f-300">Dennis Abdulmalik</h4>
                  <p className="sub__title">Product Category</p>
                </div>
              </TableCell>
              <TableCell> Phones </TableCell>

              <TableCell> 400,000 </TableCell>
              <TableCell> June 12, 2005 </TableCell>
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
                <img src={profile} className="profile_pic" />
                <button className="btn btn-primary p-25 mt-15">
                  Upload Photo
                </button>
              </div>
            </div>
            <form style={{ width: "100%" }}>
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
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
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
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
                    <option value="default"> Select Brand</option>
                    <option value="Parent 1"> Brand 1</option>
                    <option value="Parent 2"> Brand 2</option>
                    <option value="Parent 3"> Brand 3</option>
                    <option value="Parent 4"> Brand 4</option>
                  </select>
                </div>

                <div className="pos-rel w100-m10 ">
                  <label> Cost Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="costPrice"
                    placeholder="1,500"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>Selling Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="sellingPrice"
                    placeholder="1,200"
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
                    name="moreImages"
                    accept=".jpg,.png,.jpeg"
                    multiple
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Description </label>
                  <textarea
                    placeholder="Enter product description"
                    className="form-textarea w-100"></textarea>
                </div>

                <div className="pos-rel w100-m10"></div>
              </section>

              <div className="flex__normal w-30 pull-right mt-35">
                <button
                  onClick={handleModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
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
