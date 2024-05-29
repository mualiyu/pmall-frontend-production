import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
const Gallery = () => {
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
                            <div className='flex alc g-10'>
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
                            </div>
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
                                <p className='bold'>Full url</p>
                                <div className='flex justsb url w-full'>
                                    <p>https://knjhszncjgakhvjgscb</p>
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