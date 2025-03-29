import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from "../../context/UserContext";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
   
    return (
    <>
            <img src="/Screenshot 2024-03-19 163145.png" alt="" style={{width: '100%'}}/>
                
                <div className='flex justsb alc g-10' style={{padding: '40px 20px'}}>
                        
                        <div className='deals flex flex-col g-10'>
                            <h3>NEVER MISS THESE DEALS</h3>
                            <div className='grid grid-2 g-20'>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163309.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163409.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163446.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163531.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                            </div>
                        </div>
                        <div className='deals flex flex-col g-10'>
                            <h3>NEVER MISS THESE DEALS</h3>
                            <div className='grid grid-2 g-20'>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163309.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163409.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163446.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                                <div className='flex flex-col g-10'>
                                    <img src="/Screenshot 2024-03-20 163531.png" alt="" />
                                    <h3>Super Huge Discounted Deal</h3>
                                    <p>Login to get chance with $500 coupon</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                     <div className='store-footer flex flex-col g-40 w-90'>
                        <div className='flex justsb'>
                            <div className='flex flex-col g-20'>
                                <h3>Our Mission</h3>
                                <div className='flex flex-col g-20'>
                                    <p>Financing</p>
                                    <p>Product recyling</p>
                                    <p>Sustainability</p>
                                    <p>Gift Return</p>
                                </div>    
                            </div>
                            <div className='flex flex-col g-20'>
                                <h3>Support</h3>
                                <div className='flex flex-col g-20'>
                                    <p>Product Support</p>
                                    <p>Pc Setup & Support</p>
                                    <p>Services</p>
                                    <p>Extended Services Plans</p>
                                    <p>Community</p>
                                </div>    
                            </div>
                            <div className='flex flex-col g-20'>
                                <h3>Company</h3>
                                <div className='flex flex-col g-20'>
                                    <p>About Us</p>
                                    <p>Careers</p>
                                    <p>Affilates</p>
                                    <p>Blog</p>
                                </div>    
                            </div>
                            <div className='flex flex-col g-20' >
                                <h3>Quick Links</h3>
                                <div className='flex flex-col g-20'>
                                    <p>Store Location & Hours</p>
                                    <p>Click & Collect</p>
                                    <p>Payment</p>
                                    <p>Delivery</p>
                                    <p>Return & Refunds</p>
                                </div>    
                            </div>
                            <div className='flex flex-col g-20'>
                                <h3>Connect Us</h3>
                                <div className='flex flex-col g-20'>
                                    <p>Support: +234 806 571 1318</p>
                                    <p>Sales: +234 708 480 2028</p>
                                    <p>Email: support@pmall.com.ng</p>
                                </div>    
                            </div>
                        </div>
                        <div className='flex justsb'>
                            <div className='flex flex-col g-10 p-method'>
                                <h3>PAYMENT METHOD</h3>
                                <div className='flex g-10 alc'>
                                    <img src="/Screenshot 2024-03-20 222401.png" alt="" />
                                    <img src="/Screenshot 2024-03-20 222533.png" alt="" />
                                    <img src="/Screenshot 2024-03-20 222559.png" alt="" />
                                    <img src="/Screenshot 2024-03-20 222647.png" alt="" />
                                    <img src="/Screenshot 2024-03-20 222720.png" alt="" />
                                </div>
                            </div>
                            <div className='newsletter flex flex-col g-10'>
                                <div className="flex">
                                    <a href="https://www.facebook.com/share/15d9qDZ3Cv/" target="_blank">
                                        <FacebookRoundedIcon  fontSize = 'large'/>
                                    </a>
                                    <a href="https://x.com/PMALLNG?t=qkObRmh0tNuWiBxgEVuJLQ&s=09" target="_blank">
                                        <XIcon fontSize = 'large'/>
                                    </a>
                                    <a href="https://www.instagram.com/pmall.ng?igsh=ZXRpNW40M2doNm13" target="_blank">
                                        <InstagramIcon fontSize = 'large'/>
                                    </a>
                                </div>
                                <h3>Newsletter</h3>
                                <form action="" className='flex g-10'>
                                    <input type="email" name="" id="" />
                                    <button>Subscribe</button>
                                </form>
                            </div>
                        </div>

                        <div class="footer-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="gi-bottom-info">
                                    <div class="footer-copy">
                                        <div class="footer-bottom-copy ">
                                            <div class="gi-copy">Copyright © <a class="site-name" href="/">Grabit </a>all rights reserved. Powered by Grabit.
                                            </div>
                                            </div>
                                            </div>
                    </div>
                    </div></div></div>
                          </div>
                    
            </>
    )                       
}


export default Footer;