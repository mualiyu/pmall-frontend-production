import * as React from "react";
import { useState, useEffect } from "react";
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
import Vendors from "../vendors";
import Toaster from "../../utils/toaster";
import ButtonLoader from "../../utils/buttonLoader";
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
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

const categoryColumns = [
  { id: "category_image", label: "Category Image" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "sub_categories", label: "Sub Categories" },
  { id: "created_at,", label: "Created At" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

const brandColumns = [
  { id: "brand_image", label: "Brand Image" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "created_at,", label: "Created At" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
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
  const [brands, setBrand] = useState();
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [newProduct, setNewProduct] = useState();
  const [value, setValue] = useState(0);
  const [pmallUsers, setPmallUsers] = useState([]);
  const [moreImages, setMoreImages] = useState([]);
  const { user } = useUser();
  const {inputValues, setState, onChangeHandler,loading, setLoading} = useVendor();
  const handleChange = (event, newValue) => {
    const selectedTitles = newValue.map((tag) => tag.title).join(', '); // Join titles with comma
    console.log(selectedTitles); // Update state with comma-separated string
    setState((inputValues) => ({
      ...inputValues,
      tags: selectedTitles,
    }));
  };
  const [toastType, setToastType] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [newProductModal, setNewProductModal] = useState(false);
  const  [newCategoryModal, setNewCategoryModal] = useState(false);
  const  [newSubCategoryModal, setNewSubCategoryModal] = useState(false);
  const  [newBrandModal, setNewBrandModal] = useState(false);
  const  [editProductModal, setEditProductModal] = useState(false);
  const  [editCategoryModal, setEditCategoryModal] = useState(false);
  const  [editSubCategoryModal, setEditSubCategoryModal] = useState(false);
  const  [editBrandModal, setEditBrandModal] = useState(false);
  const handleModalClose = () => setNewProductModal(false);
  const handleCategoryModalClose = () => setNewCategoryModal(false);
  const handleSubCategoryModalClose = () => setNewSubCategoryModal(false);
  const handleBrandModalClose = () => setNewBrandModal(false);
  const handleEditProductModalClose = () => setEditProductModal(false);
  const handleEditCategoryModalClose = () => setEditCategoryModal(false);
  const handleEditSubCategoryModalClose = () => setEditSubCategoryModal(false);
  const handleEditBrandModalClose = () => setEditBrandModal(false);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
      const newCategory = e.target.value;
      setSelectedCategory(newCategory);
    console.log(newCategory)
      const matchingSubCategories = categories.find((category) => category.id == newCategory)?.sub_categories || [];
      setSubCategories(matchingSubCategories);
      console.log(matchingSubCategories)
      console.log(categories)
      if(!e?.persist){
          setState(inputValues, ({...inputValues, [e?.target.name]: e?.target.value })); 
      }else {
          e?.persist();
          const target = e?.target;
    if (target?.name) {
      setState((inputValues) => ({
        ...inputValues,
        [target.name]: target.value,
      }));
    }
      }
  };

  


  const VendorCreateProduct = async(e) => {
    if (e) {
      e.preventDefault(); 
      setLoading(true)
      inputValues.more_images = moreImages?.join(", ")
    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/products/create', {
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
        setToastMsg("Great! Product added successfully");
        setToastType("success")
        setInterval(() => {
          setToastMsg("");
 }, 5000);
        setLoading(false)
        setNewProduct(data)
        handleModalClose()
      } else {
        const error = await response.text();
        console.error('Error posting product:', error);
        setLoading(false)
        setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
        setToastType("error")
        setInterval(() => {
          setToastMsg("");
 }, 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  };

  const vendorUpdateProduct = async(e) => {
    if (e) {
      e.preventDefault(); 
    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/products/update/1', {
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
        handleEditProductModalClose()
        setToastMsg("Great! Product updated successfully");
        setToastType("success")
        setInterval(() => {
          setToastMsg("");
 }, 5000);
      } else {
        const error = await response.text();
        console.error('Error posting product:', error);
        setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
        setToastType("error")
        setInterval(() => {
          setToastMsg("");
 }, 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  };

  const vendorUpdateCategory = async(e) => {
    if (e) {
      e.preventDefault(); 
    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/product-category/update?category_id=' + inputValues.id + '&category_image=' + inputValues.category_image + '&name=' + inputValues.name + '&description=' + inputValues.description , {
        method: 'POST',
        headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" ,
          'Authorization': `Bearer ${user?.token}`
        },
      });
      console.log(inputValues)
      if (response.status) {
        const data = await response.json();
        console.log('product:', data);
        setNewProduct(data)
        handleEditCategoryModalClose()
        setToastMsg("Great! Category updated successfully");
        setToastType("success")
        setInterval(() => {
          setToastMsg("");
 }, 5000);
      } else {
        const error = await response.text();
        console.error('Error posting product:', error);
        setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
        setToastType("error")
        setInterval(() => {
          setToastMsg("");
 }, 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  };

  
  const vendorUpdateSubCategory = async(e) => {
    if (e) {
      e.preventDefault(); 
    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/product-sub-category/update?category_id=' + inputValues.id + '&category_image=' + inputValues.category_image + '&name=' + inputValues.name + '&description=' + inputValues.description , {
        method: 'POST',
        headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" ,
          'Authorization': `Bearer ${user?.token}`
        },
      });
      console.log(inputValues)
      if (response.ok) {
        const data = await response.json();
        console.log('product:', data);
        setNewProduct(data)
        handleEditSubCategoryModalClose()
        setToastMsg("Great! Product added successfully");
        setToastType("success")
        setInterval(() => {
          setToastMsg("");
 }, 5000);
      } else {
        const error = await response.text();
        console.error('Error posting product:', error);
        setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
        setToastType("error")
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  };

  const vendorUpdateBrand = async(e) => {
    if (e) {
      e.preventDefault(); 
    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/product-brand/update?brand_id=' + inputValues.id + '&brand_image=' + inputValues.brand_image + '&name=' + inputValues.name + '&description=' + inputValues.description , {
        method: 'POST',
        headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" ,
          'Authorization': `Bearer ${user?.token}`
        },
      });
      console.log(inputValues)
      if (response.ok) {
        const data = await response.json();
        console.log('product:', data);
        setNewProduct(data)
        handleEditBrandModalClose()
        setToastMsg("Great! Brand updated successfully");
        setToastType("success")
        setInterval(() => {
          setToastMsg("");
 }, 5000);
      } else {
        const error = await response.text();
        console.error('Error posting product:', error);
        setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
        setToastType("error")
        setInterval(() => {
          setToastMsg("");
 }, 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  };


 function editProduct(data){
    setEditProductModal(true)
    console.log(data)
    setState(data)
  }

 function editCategory(data){
  setEditCategoryModal(true)
  console.log(data)
  setState(data)
 }

 function editSubCategory(data){
  setEditSubCategoryModal(true)
  console.log(data)
  setState(data)
 }

 function editBrand(data){
  setEditBrandModal(true)
  console.log(data)
  setState(data)
 }


  let publishedCount = 0;

  const id = "PMS-892040"

  const getProducts = () => {
    if(user?.accountType== "Vendor"){
      fetch("https://api.pmall.com.ng/api/v1/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
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
    }else{
      fetch("https://api.pmall.com.ng/api/v1/products/?store_id=" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
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
    }
  };

  const addCategory = (e) => {
    e.preventDefault()
    fetch("https://api.pmall.com.ng/api/v1/product-category/create?category_image="+ inputValues.category_image + "&name=" + inputValues.name + "&description=" + inputValues.description, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if(result.status){
          setToastMsg("Great! Category added successfully");
          setToastType("success")
          setInterval(() => {
            setToastMsg("");
   }, 5000);
        console.log(result);
        setNewProduct(result)
        handleCategoryModalClose()
        }else{
          setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
          setToastType("error")
          setInterval(() => {
            setToastMsg("");
   }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSubCategory = (e) => {
    e.preventDefault()
    fetch("https://api.pmall.com.ng/api/v1/product-sub-category/create?category_id=" + inputValues.category_id  + "&name=" + inputValues.name + "&description=" + inputValues.description, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if(result.status){
          setToastMsg("Great! Subcategory added successfully");
          setToastType("success")
          setInterval(() => {
            setToastMsg("");
   }, 5000);
        console.log(result);
        setNewProduct(result)
        handleSubCategoryModalClose()
        }else{
          setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
          setToastType("error")
          setInterval(() => {
            setToastMsg("");
   }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addBrand = (e) => {
    e.preventDefault()
    fetch("https://api.pmall.com.ng/api/v1/product-brand/create?brand_image="+inputValues.brand_image + "&name=" + inputValues.name + "&description=" + inputValues.description, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if(result.status){
          setToastMsg("Great! Brand added successfully");
          setToastType("success")
          setInterval(() => {
            setToastMsg("");
   }, 5000);
          console.log(result);
          setNewProduct(result)
          handleBrandModalClose()
        }else{
          setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
          setToastType("error")
          setInterval(() => {
            setToastMsg("");
   }, 3000);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = () => {
    fetch("https://api.pmall.com.ng/api/v1/product-category/get-all",{
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setCategories(result.data.categories)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const getBrands = () => {
    fetch("https://api.pmall.com.ng/api/v1/product-brand/get-all?store_id=" +id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setBrand(result.data.brands)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (productId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      fetch("https://api.pmall.com.ng/api/v1/products/delete-account?product_id=" + productId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          if(result.status){
            setToastMsg("Great! Product deleted successfully");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
     }, 5000);
            console.log(result);
            setNewProduct(result)
          }else{
            setToastMsg("Oops! there seems to be an error. Try again")
            setToastType("error")
            setInterval(() => {
              setToastMsg("");
     }, 3000);
      }
        })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const deleteCategory = (categoryId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      fetch("https://api.pmall.com.ng/api/v1/product-category/delete?category_id=" + categoryId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          if(result.status){
            setToastMsg("Great! Category deleted successfully");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
     }, 5000);
            console.log(result);
            setNewProduct(result)
            setInterval(() => {
              setToastMsg("");
     }, 3000);
          }else{
            setToastMsg("Oops! there seems to be an error. Try again")
            setToastType("error")
            setInterval(() => {
              setToastMsg("");
     }, 3000);
          }
          
        })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  const deleteSubCategory = (categoryId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      fetch("https://api.pmall.com.ng/api/v1/product-sub-category/delete?sub_category_id=" + categoryId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          if(result.status){
            setToastMsg("Great! Subcategory deleted successfully");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
     }, 5000);
            console.log(result);
            setNewProduct(result)
          }else{
            setToastMsg("Oops! there seems to be an error. Try again")
            setToastType("error")
            setInterval(() => {
              setToastMsg("");
     }, 3000);
          }
        })
      .catch((err) => {
        console.log(err);
      });
    }
  };


  const deleteBrand = (brandId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this brand?');
    if (isConfirmed) {
      fetch("https://api.pmall.com.ng/api/v1/product-brand/delete?brand_id=" + brandId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          if(result.status){
            setToastMsg("Great! Brand deleted successfully");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
     }, 5000);
            console.log(result);
            setNewProduct(result)
          }else{
            setToastMsg("Oops! there seems to be an error. Try again")
            setToastType("error")
            setInterval(() => {
              setToastMsg("");
     }, 3000);
          }
        })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const addCommasToNumberString = (numberString) =>{
    return  numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }

  useEffect(() => {
    getProducts();
    getBrands()
    getCategories()
console.log(user?.accountType)
  }, [newProduct]);
  return (
    <section>
      <Toaster text={toastMsg} className={toastType} />
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
                  <Tab label="Sub Categories" {...a11yProps(2)} />
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
            <select className="search__bar w-200" defaultValue={"default"} >
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
          <Table sx={{ minWidth: 650 }} size="small" aria-label="Product Table">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, index) => (                   
                <TableRow key={product?.id} className="capitalize">
                  <TableCell className="b-r" onClick={() => navigate(`/app/products/details/${product?.id}`)}>
                    <div className="d-flex alc f-10 flex-start">
                        <img src={product.image} alt="" className="w50"/>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}>
                    <div className="lheight13">
                      <h4 className="f-300">{product?.name} </h4>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}>
                    {categories?.map(category =>(
                    category?.id == product?.category_id && category?.name 
                  ))}       
                  </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}>
                    {brands?.map(brand =>(
                      brand?.id == product?.brand_id && brand?.name 
                    ))}
                  </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}> &#x20A6;{addCommasToNumberString(product?.cost_price)} </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}> &#x20A6;{addCommasToNumberString(product?.selling_price)} </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}> {product?.inStock} </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}> {moment(product?.created_at).add(1, "years").calendar()} </TableCell>
                  <TableCell onClick={() => navigate(`/app/products/details/${product?.id}`)}>
                    {" "}
                    {product?.status == 1 ?
                    <span className="badge">Published</span>
                    : <span className="badge">unpublished</span>
                    }
                  </TableCell>
                  <TableCell  onClick={() => editProduct(product)}>
                    {" "}
                    <EditIcon />{" "}
                  </TableCell>
                  <TableCell onClick={()=>deleteProduct(product.id)}>
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
              {categories && categories.map((category, index) => (                   
                <TableRow key={category.id} className="capitalize">
                <TableCell className="b-r">
                  <div className="d-flex alc f-10 flex-start">
                      <img src={category.category_image} alt="" className="w50"/>
                  </div>
                </TableCell>
                <TableCell>
                    <h4 className="f-300">{category.name} </h4>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                    <h4 className="f-300">{category.sub_categories.map((item) => item.name).join(', ')} </h4>
                </TableCell>
                <TableCell> {moment(category.created_at).add(1, "years").calendar()} </TableCell>
                <TableCell onClick={()=>editCategory(category)}> 
                  {" "}
                  <EditIcon />{" "}
                </TableCell>
                <TableCell onClick={()=>deleteCategory(category.id)}>
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
              {brands && brands.map((brand, index) => (                   
                <TableRow key={brand.id} className="capitalize">
                <TableCell className="b-r">
                  <div className="d-flex alc f-10 flex-start">
                    <img src={brand.brand_image} alt="" className="w50"/>
                  </div>
                </TableCell>
                <TableCell>
                    <h4 className="f-300">{brand.name}</h4>
                </TableCell>
                <TableCell>{brand.description}</TableCell>
                <TableCell> {moment(brand.created_at).add(1, "years").calendar()} </TableCell>
                <TableCell onClick={()=>editBrand(brand)}>
                  {" "}
                  <EditIcon />{" "}
                </TableCell>
                <TableCell onClick={()=>deleteBrand(brand.id)}>
                  {" "}
                  <DeleteIcon/>{" "}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <section className="flex-container alc p-y my-40">
          <div className="w-full">
            <button
              className="btn btn-primary p-25 pull-right"
              onClick={() => setNewSubCategoryModal(true)}>
              Add Sub category
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
              {subCategories && subCategories?.map((category, index) => (                   
                <TableRow key={category.id}>
                <TableCell className="b-r">
                  <div className="d-flex alc f-10 flex-start">
                      <img src={category.category_image} alt="" className="w50"/>
                  </div>
                </TableCell>
                <TableCell>
                    <h4 className="f-300">{category.name} </h4>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell> {moment(category.created_at).add(1, "years").calendar()} </TableCell>
                <TableCell onClick={()=>editSubCategory(category)}> 
                  {" "}
                  <EditIcon />{" "}
                </TableCell>
                <TableCell onClick={()=>deleteSubCategory(category.id)}>
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
                <img src={profile} className="profile_pic" name="image" value={inputValues.image || ""} />
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                    {subCategories?.map((category) => (
                      <option value={category.id}>{category.name}</option>
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                <button className="btn btn-primary p-25 pull-right"
                 onClick={ VendorCreateProduct}
                disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Save"}
                </button>
              </div>
            </form>
          </section>
        </Box>
      </Modal>
      
      <Modal
        open={editProductModal}
        onClose={handleEditProductModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Update Product</h4>
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                    name="sub_category_id"
                    onChange={onChangeHandler}
                    >
                    <option value="default"> Select Sub Category</option>
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                  onClick={handleEditProductModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button className="btn btn-primary p-25 pull-right" onClick={vendorUpdateProduct} disabled={loading}
                >
                {loading ?<ButtonLoader /> : " Save"}
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                            category_image: data.url, 
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
                <div className="flex__normal w-full pull-right mt-35">
                  <button
                    onClick={handleCategoryModalClose}
                    className="btn btn-secondary p-25 pull-right mr-10">
                    Cancel
                  </button>
                    <button className="btn btn-primary p-25 pull-right" onClick={addCategory} disabled={loading}
                  >
                    {loading ?<ButtonLoader /> : " Create Category"}
                  </button>
                </div>
              </form>
            </section>
          </section>
        </Box>
      </Modal>

      <Modal
        open={editCategoryModal}
        onClose={handleEditCategoryModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Update Category</h4>
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                            category_image: data.url, 
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
                <div className="flex__normal w-30 pull-right mt-35">
                <button
                  onClick={handleEditCategoryModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                  <button className="btn btn-primary p-25 pull-right" onClick={vendorUpdateCategory} disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Update Category"}
                  </button>
                </div>
              </form>
            </section>
          </section>
        </Box>
      </Modal>

      <Modal
        open={newSubCategoryModal}
        onClose={handleSubCategoryModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Sub Category</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-200">
              <div className="profile_pic_holder">
                <img src={profile} className="profile_pic" name="image" value={inputValues.image|| ""} />
                <div className="pos-rel w100-m10 ">
                  
                </div>
                {/* <button className="btn btn-primary p-25 mt-15" onClick={uploadFile}>
                  Upload Photo
                </button> */}
              </div>
            </div>
            <section className="flex-container flex-col g-20 mb-lg w-full">
              <form className="flex-container flex-col g-20 mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Sub Category Name</label>
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
                  <label className="mb-7">Sub Category description</label>
                  <textarea
                    className="search__bar w-100"
                    value={inputValues.description|| ""}
                    name="description"
                    rows={6}
                    onChange={onChangeHandler}
                    >
                  </textarea>
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Parent Category</label>
                  <select
                    className="search__bar w-100"
                    value={inputValues.category_id || ""}
                    name="category_id"
                    onChange={onChangeHandler}
                    >
                    <option value="default"> Select Category</option>
                    {categories?.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex__normal w-full pull-right mt-35">
                <button
                  onClick={handleSubCategoryModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                  <button className="btn btn-primary p-25 pull-right" onClick={addSubCategory} disabled={loading}
                >
                {loading ?<ButtonLoader /> : " Update Sub Category"}
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                            brand_image: data.url, 
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
                <div className="flex__normal w-30 pull-right mt-35">
                <button
                  onClick={handleBrandModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                  <button className="btn btn-primary p-25 pull-right" onClick={addBrand} disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Create Brand"}
                  </button>
                </div>
              </form>
            </section>
          </section>
        </Box>
      </Modal>

      <Modal
        open={editBrandModal}
        onClose={handleEditBrandModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Update Brand</h4>
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
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
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
                            brand_image: data.url, 
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
                <div className="flex__normal w-30 pull-right mt-35">
                <button
                  onClick={handleEditBrandModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                  <button className="btn btn-primary p-25 pull-right" onClick={vendorUpdateBrand}  disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Create Brand"}
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