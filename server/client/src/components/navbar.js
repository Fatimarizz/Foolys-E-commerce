import {  Grid, } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import React, { useState,useEffect } from 'react';
import Drawer from './Drawer';


import { NavLink } from 'react-router-dom';


export default function Navbar() {

     const count = useSelector((state) => state.Cartcounter.length)
     const userLogin = useSelector((state)=>state.counter.toggle)

    
    let [state, setstate] = useState(false);
    const [stickyClass, setStickyClass] = useState('relative');

    useEffect(() => {
     
      window.addEventListener('scroll', stickNavbar);
     
      return () => {
        window.removeEventListener('scroll', stickNavbar);
      };
    }, []);
  
    const stickNavbar = () => {
      if (window !== undefined) {
        let windowHeight = window.scrollY;
        windowHeight > 200 ? setStickyClass('fixed top-0 right-0 w-full ') : setStickyClass('relative');
      }
    };
  
    

    return (
        <div className={` text-black h-[5rem]  text-lg bg-white px-[40px] pr-3  ${stickyClass}`} style={{transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', borderRadius: '11px'
        , boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        overflow: 'hidden',}}>
            <Grid container   >
                <Grid item xs={6} md={3}>
               
               <NavLink to={'/'}><img className="h-[80px] p-1 xs:absolute " alt='logo' src='./images/capture.png' ></img></NavLink>
                </Grid>


                <Grid item md={9} sx={{ display: { md: 'block', sm: 'flex', xs: 'none' } ,paddingTop:'20px' }}>
                    <ul className="flex space-x-3 right-0 absolute font-normal , tracking-wider ">
                        <li className='cursor-pointer , hover:bg-[#ef9baa] hover:text-white rounded-md p-2 '> <NavLink to="/"> Home </NavLink></li>
                    {(userLogin)?  (<li className='cursor-pointer , hover:bg-[#ef9baa] hover:text-white rounded-md p-2 '><NavLink to="/logout"> logout </NavLink></li>)
                    :(<li className='cursor-pointer , hover:bg-[#ef9baa] hover:text-white rounded-md p-2 '> <NavLink to="/login"> login </NavLink></li>)}
                    <li className='cursor-pointer , hover:bg-[#ef9baa] hover:text-white rounded-md p-2 '> <NavLink to="/signup"> Sign Up </NavLink></li>
                    <li className='cursor-pointer , hover:bg-[#ef9baa] hover:text-white rounded-md p-2 '> <NavLink to="/catalogue"> Catalogue </NavLink></li>
                       
                        
                        <li >
                        <NavLink to="/cart"><IconButton  >
                            <ShoppingCartTwoToneIcon sx={{ height: '2rem', width: '2rem' ,marginRight:'20px'}} />  
                            <div className="rounded-full bg-gray-700 text-white text-sm h-5 w-5 ml-[-27px] mt-[-35px]">{count}</div>
                            </IconButton> 
                            </NavLink>
                            
                           
                            </li>
                           
                    </ul>
                </Grid>
                <Grid item xs={6} md={6} sx={{display: { md: 'none', sm:'none', xs: 'flex' }, alignItems: 'center', justifyContent: 'right' }}>
                    <IconButton  onClick={() => { setstate(!state) }}>
                        <MenuIcon />
                    </IconButton>

                </Grid>
                {state === true ? <Drawer state={state} setstate={setstate} /> : null}
                </Grid>
        </div >

    )
}
