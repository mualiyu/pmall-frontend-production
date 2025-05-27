import * as React from "react";
import { useState, useEffect } from "react";
import Loading from "../../utils/loading";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useUser } from "../../context/UserContext";
import { useVendor } from "../../context/VendorSignupContext";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const Gallery = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [productList, setProductList] = useState(null);
    const { loading, setLoading, setProfileDetails } = useVendor();


    const getVendorProducts = async () => {
        const storeId = user?.refId;
        if (!storeId) {
          console.warn("Store ID missing");
          return;
        }
      
        setLoading(true);
      
        try {
          const response = await fetch(`${BASE_URL}/products/?store_id=${storeId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
      
          const result = await response.json();
          console.log("API Response:", result);
      
          if (result.status) {
            setProductList(result.data);
          } else {
            console.warn("API error:", result.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };
      

      useEffect(() => {
          console.log(user);
        let isLoggedIn = localStorage.getItem("authToken");
        if (!isLoggedIn) {
          navigate("/");
        }
        getVendorProducts();
      }, []);


    const galleryImages = [
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
        {name:"image 1",image:"/1.png", time:"20 Nov, 2023 - 2:30 PM", modified:"20 Nov, 2023 - 2:30 PM",url:"https://knjhszncjgakhvjgscb"},
    ]
    return ( 
        <section className=" w-full" style={{display:"block"}}>
            <div className="gallery">
                <div className="page__header">
                    <h1>All Gallery</h1>
                </div>
            
                <div className="flex-container w-full p-y my-40 g-20">
                    <div className="left w-full flex flex-col g-20 ">
                        <div className='flex alc justsb'>
                            {/* <div className='flex alc g-10'>
                                <div className='flex alc gallery-tag'>
                                    <CloudUploadIcon />
                                    <p>Upload</p>
                                </div>
                                <div className='flex alc gallery-tag'>
                                    <CloudDownloadIcon />
                                    <p>Download</p>
                                </div>
                                <div className='flex alc gallery-tag'>
                                    <CreateNewFolderOutlinedIcon />
                                    <p>Create folder</p>
                                </div>
                                <div className='flex alc gallery-tag'>
                                    <FilterAltOutlinedIcon />
                                    <p>Filter</p>
                                </div>
                                <div className='flex alc gallery-tag'>
                                    <RemoveRedEyeOutlinedIcon />
                                    <p>View in</p>
                                </div>
                            </div> */}
                            <div>
                                <input type="text" placeholder="Search"/>
                            </div>
                        </div>
                        <div className='flex justsb alc sort'>
                            <p>File</p>
                            <div className='flex alc g-10'>
                                <select name="" id="">
                                    <option value="1">Sort</option>
                                </select>
                                <div className='flex alc'>
                                <GridViewOutlinedIcon />  
                                <FormatListBulletedOutlinedIcon />      
                                </div>   
                            </div>
                        </div>
                        <div className='grid grid-4 g-20 justsb'>
                            {galleryImages.map(details => (
                                <div className='img-grid flex flex-col all-center g-10'>
                                    <img src={details.image} alt="" />
                                    <p>{details.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" right flex flex-col g-40">
                        <img src="/1.png" alt="" />
                        <div className="flex flex-col g-20">
                            <div className=" flex flex-col g-5 img-detail underline">
                                <p className='bold'>Name</p>
                                <p>Image 8</p>
                            </div>
                            <div className=" flex flex-col g-5 img-detail underline">
                                <p className='bold'>Uploaded at</p>
                                <p>20 Nov, 2023 - 2:30 PM</p>
                            </div>
                            <div className=" flex flex-col g-5 img-detail underline">
                                <p className='bold'>Modified at</p>
                                <p>20 Nov, 2023 - 2:30 PM</p>
                            </div>
                            <div className=" flex flex-col img-detail g-5">
                                <p className='bold'>My Store URL</p>
                                <div className='flex justsb url w-full'>
                                <p>{`${BASE_URL}/products/?vendor_id=${user.refId}`}</p>
                                    <ContentCopyOutlinedIcon className='copy'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
} 
 
export default Gallery;