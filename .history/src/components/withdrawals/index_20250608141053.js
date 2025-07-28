import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import moment from "moment";
import Loading from "../../utils/loading";
import currency from "../../utils/formatCurrency";
import Toast from "../../utils/Toast";
import { BASE_URL } from "../../utils/config"; 
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  { id: "date", label: "Transaction Date" },
  { id: "reference", label: "Transaction Reference" },
  { id: "amount", label: "Amount" },
  { id: "method", label: "Method" },
  { id: "status", label: "Transaction Status" },
  
];


function createData(
    date,
    reference,
    amount,
    method,
    status
) {
  return {
    date,
    reference,
    amount,
    method,
    status
  };
}

const WithdrawalHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [newWithdrawalModal, setNewWithdrawalModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] =useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const handleModalClose = () => setNewWithdrawalModal(false);

  const fetchAllWithdrawalRequests = () => {
    setLoading(true);
    fetch(`${BASE_URL}/withdrawal/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
        },
    })
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
          // setTransactions(result.sales);
          setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setToast({ message: "Error Fetching Transaction log", type: "error" });
            setTimeout(() => setToast(null), 5000);
            setLoading(false);
        });
};


useEffect(()=> {
  fetchAllWithdrawalRequests();
},[])


  return (
    <>
    <Loading loading={loading} />
    
    {!loading && (<section>
       
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <section className="page__header">
        <div className="flex-container alc jusbtw">
          <div className="flex-container alc">
          <div className="mr-10">
          <CreditCardIcon />
          </div>
          <div>
          <h3>Withdrawal History</h3> 
          <p className="text-muted mt-n-5"> Here, you will find all your withdrawal history</p>
          </div>
          </div>
          <div>
          
          <button
              className="btn btn-primary p-25"
              // onClick={() => setNewRequestModal(true)}
              >
              New Request
            </button>
          </div>
        </div>
      </section>
      <div className="s-divider"></div>
      

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Vendors Table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {transactions?.map((trx)=> (
          <TableRow key={trx.id}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">{moment(trx.created_at).format("ll")} </h4>
                  </div>
                </div>
              </TableCell>
              
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">
                      { currency(trx.total_amount) } 
                      </h4>
                    </div>
              </div>
              </TableCell>
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">
                 { trx.payment_status }
                </h4>
                </div>
                </div>
                </TableCell>
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <ol style={{lineHeight: "2em"}}>
                      {trx?.products?.map((pro)=>(
                      <li key={pro.id} className="capitalize">{pro?.name} - ({currency(pro?.cost_price)}) </li>
                      ))}
                    </ol>
                   
                       </div>
                       </div>
               </TableCell>
            </TableRow>
            ))}
           
          </TableBody> */}
        </Table>
      </TableContainer>


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
            <div className="w-250">
              <div className="">
                {inputValues.image ?
                 <img src={inputValues.image} className="w-100i" name="image" value={inputValues.image || ""} /> :
                <img src={profile} className="w-100i" name="image" value={inputValues.image || ""} />
                }
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
                        `${BASE_URL}/products/upload-file`,
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
                    placeholder="e.g Herbal jinger"
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
                    onChange={handleCategoryChange}
                    >
                    <option value="default"> Select Category</option>
                    {categories?.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Sub Category</label>
                  <select
                    className="search__bar w-100"
                    value={inputValues.sub_category_id || ""}
                    name="sub_category"
                    onChange={onChangeHandler}
                    value={inputValues.sub_categories}
                    disabled={!selectedCategory}
                    >
                    <option value="default"> Select Sub Category</option>
                    {subCategories?.map((sub_cat) => (
                      <option value={sub_cat.id}>{sub_cat.name}</option>
                    ))}
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
                    {brands?.map((brand) => (
                      <option value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pos-rel w100-m10 ">
                  <label> Cost Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="cost_price"
                    placeholder="1500"
                    onChange={onChangeHandler}
                    value={inputValues.cost_price || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>Selling Price (lower than cost price)</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="selling_price"
                    placeholder="1200"
                    onChange={onChangeHandler}
                    value={inputValues.selling_price || ""}
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                  <label> PRODUCT AVAILABLE FOR PURCHASE?</label>
                  <select
                  className="form-control-input "
                  name="inStock"
                    // value={inputValues.category_id || ""}
                    // name="category_id"
                    onChange={onChangeHandler}
                    value={inputValues.inStock || ""}
                    >
                    <option value="default"> Select Product availability</option>
                    
                      <option value={1}>In Stock</option>
                      <option value={0}>Currently Out of Stock</option>
                  </select>

                  {/* <input
                    type="number"
                    className="form-control-input "
                    name="inStock"
                    placeholder="500"
                    onChange={onChangeHandler}
                    value={inputValues.inStock || ""}
                  /> */}
                </div>

                <div className="pos-rel w100-m10 ">
                  <label>Quantity AVAILABLE</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="quantity"
                    placeholder="500"
                    onChange={onChangeHandler}
                    value={inputValues.quantity || ""}
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w-100 ">
                  <label style={{marginBottom: 7}}>SELECT TAGS ASSOCIATED WITH PRODUCT </label>
                  <Stack spacing={3} sx={{ width: "100%" }}>
                  <Autocomplete
            multiple
            freeSolo
            id="tags-outlined"
            options={[]}
            value={inputValues.tags}
            onChange={handleChange}
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Type a tag and press enter" />
            )}
          />
                  </Stack>
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label>More Images 1</label>
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
                        `${BASE_URL}/products/upload-file`,
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
                          setLoading(false);
                          console.log(data)
                          setMoreImages([...moreImages, data.url])
                          console.log(moreImages)
                        })
                        .catch((error) => {
                          setLoading(false);
                          console.log(error)
                        });
                    }}
                    multiple
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>More Images 2</label>
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
                        `${BASE_URL}/products/upload-file`,
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
                          setMoreImages([...moreImages, data.url])
                          console.log(moreImages)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                    multiple
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>More Images 3</label>
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
                        `${BASE_URL}/products/upload-file`,
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
                          setMoreImages([...moreImages, data.url])
                          console.log(moreImages)
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
              <div>
                <p className="uppercase f-13">Best taken:</p>
                <div className="spec-list m-10">
                  {bestTaken.map((item, index) => (
                    <div className="spec f-13">
                      <label className="mb-7">{item.name} </label>
                      <div
                          className="flex all-center"
                      >
                     <label className="switch">
                        <input
                            type="checkbox"
                            checked={item.value}
                            onChange={() => handleBestTakenToggle(index)}
                        />
                        <span className="slider round"></span>
                    </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </section>
              <section className="flex-container mb-lg">
              <div>
                <p className="uppercase f-13">Product not for:</p>
                <div className="spec-list flex m-10">
                  {notFor.map((item, index) => (
                    <div className="spec f-13">
                     <label className="mb-7">{item.name} </label>
                      <div
                          className="flex all-center"
                      >
                      <label className="switch">
                        <input
                            type="checkbox"
                            checked={item.value}
                            onChange={() => handleNotForToggle(index)}
                        />
                        <span className="slider round"></span>
                    </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Describe this product (Weight, variant, size etc) </label>
                  <textarea
                    placeholder=""
                    className="form-textarea w-100 mt-10"
                    name="description"
                    onChange={onChangeHandler}
                    value={inputValues.description || ""}
                    ></textarea>
                </div>

                {/* <div className="pos-rel w100-m10"></div> */}
              </section>

              <div className="flex__normal pull-right mt-35">
                <button
                  onClick={handleModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button className="btn btn-primary p-25 pull-right"
                 onClick={ VendorCreateProduct}
                disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Save Product"}
                </button>
              </div>
            </form>
           
          </section>
        </Box>
      </Modal>
      
      
    </section>
    )}
    </>
  );
};

export default WithdrawalHistory;
