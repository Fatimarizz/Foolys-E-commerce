import React from 'react'
import { SwipeableDrawer,Typography,Box } from '@mui/material'
import {Link} from 'react-router-dom'

export default function Drawer({state,setstate}) {
  console.log(state)
  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={state}
        
        onClose={() => {
          setstate(!state);
        }}
      >
        <Box sx={{ backgroundColor:'lightgray' , height:'100%'}}>
        <Box sx={{ padding: "40px", margin: "20px auto"  }}>
        <Link to={"/Catalogue"}>
            <Typography
              variant="h6"
              sx={{ margin: "20px auto", fontFamily:'Helvatica'}}
            >
             Shop Now
            </Typography>
          </Link>
          <Link to={"/login"}>
            <Typography
              variant="h6"
              sx={{ margin: "20px auto",fontFamily:'Helvatica' }}
            >
         Login
            </Typography>
          </Link>
          <Link to={"/signup"}>
            <Typography
              variant="h6"
              sx={{ margin: "20px auto", fontFamily:'Helvatica'}}
            >
             Sign up
            </Typography>
          </Link>
          <Link to={"/cart"}>
            <Typography variant="h6" sx={{ fontFamily:'Helvatica'}}> Cart
            </Typography>
          </Link>
        </Box>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}