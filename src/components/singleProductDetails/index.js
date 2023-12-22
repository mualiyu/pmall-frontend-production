import FavoriteIcon from '@mui/icons-material/Favorite';

import Rating from '@mui/material/Rating';
import {useState} from 'react'


const details = [{
    mainImage:"https://media.istockphoto.com/id/1392944438/photo/portrait-of-handsome-attractive-positive-curly-haired-indian-or-arabian-guy-wearing-white.webp?b=1&s=170667a&w=0&k=20&c=AuDfv9PdKqXO3nKHFc-uBZ1bt0SXXceqFLo-OhJnI6o=",
    otherImages:[{
        image:"https://media.istockphoto.com/id/1310094528/photo/basic-wear-hand-holding-black-t-shirt-on-a-hanger-against-white-background.webp?s=170667a&w=0&k=20&c=_gc1x-FkGLyRziOxZR_IhhaQiCpHR3IBx32Q2ou4QnI="},
        {image:"https://media.istockphoto.com/id/1267770733/photo/blank-black-t-shirts-mockup-hanging-on-white-wall-template-for-your-design.webp?s=170667a&w=0&k=20&c=lFet_3NCFGqoC272Wg9bJNVVmza8k2v5uQeco8CtdFM="},
        {image:"https://media.istockphoto.com/id/1339828542/photo/mockup-blank-black-t-shirt-for-advertising-isolated-on-white-background.webp?s=170667a&w=0&k=20&c=jcXu8KkZvpYluaeOVXQ4ytqrOEFP12LrIahDNeI42tA="},
        {image:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
    }]
}
]

const ProductDetails = () => {
    const [value, setValue] = useState(4);
    return ( 
        <div className="prod-details">
            <div className="left">
                {details.map((detail) => (
                    <div>
                        <div>
                            <img src={detail.mainImage} alt="" className="main-image"/>
                        </div>
                        <div className="other-images">
                            {detail.otherImages.map((img) => (
                                <img src={img.image} alt="" className="image"/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="right">
                <h3 className="prod-name">Thick Cotton Shirt</h3>
                <Rating
                    name="read-only"
                    value={value}
                    className="rating"
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    readOnly
                />
                <h4 className="prod-price">#10,000 <span className="former-price">#12,000</span></h4>
                <p className="prod-desc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio dolor, debitis, ducimus ipsum alias accusamus quibusdam voluptates quaerat reprehenderit ratione quos fugiat sapiente delectus sequi, dolore illo maiores dolorem. Omnis!</p>
                <h3 className="f18">Available Options</h3>
                <div className="variations">
                    <div>
                        <p className="f-13  mb-10">Size</p>
                        <div className="flex g-10">
                            <p className="size">S</p>
                            <p className="size">M</p>
                            <p className="size">L</p>
                            <p className="size">XL</p>
                            <p className="size">XXL</p>
                        </div>
                    </div>
                    <div>
                        <p className="f-13  mb-10">Quantity</p>
                        <div className="flex g-20 size">
                            <p>-</p>
                            <p>1</p>
                            <p>+</p>
                        </div>
                    </div>
                </div>
                <div className="flex g-10">
                    <button className="f-13">Add to Cart</button>
                    <div className="favourite flex all-center"><FavoriteIcon /></div>
                </div>
                <div className='flex gap-10'>
                    <p className="f-13"><span className='f-bold f-13'>Category :</span> Clothing</p>
                    <p className="f-13"><span className='f-bold f-13'>Availability :</span> 180 products in stock</p>
                    <p className="f-13"><span className='f-bold f-13'>Vendor :</span> Zain Ahmed (Halal Lab)</p>
                    <p className="f-13"><span className='f-bold f-13'>Amt Sold : </span> 2000</p>
                </div>
            </div>
        </div>
     );
}
 
export default ProductDetails;