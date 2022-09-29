import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import axios from 'axios';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signupshema } from "../validation";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
       {"Copyright © "}
      <Link color="inherit" href="#">
       Fooly's
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
        

export default function Signup() {
  
  const toastsuccess = () => {
    toast.success('Successfully Register !', {
        position: toast.POSITION.TOP_RIGHT
    });
  }
  const toastdanger = () => {
    toast.error(' Invalid Credentials!',{
      position:toast.POSITION.TOP_RIGHT

    });
};
 
  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signupshema,
   
     onSubmit: values => {
    
      axios.post('http://localhost:5000/signup', values)
      
      .then(result => {
          console.log('successfully posted', result)
          toastsuccess();
          setTimeout(() => window.location='/login', 3000);
         
      }).catch(err=>{
        console.log(err)
        toastdanger()
      })
}
  });

  
 


  return (
    <Box py={10} sx={{
 
    }}>
   
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        
        <Box
          sx={{
         
           boxShadow: '8px 10px 26px 6px whitesmoke',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding:'25px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#ef9baa" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            method="post"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

              
              
       </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder="yourname@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"

                  id="password"
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
               
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="confirmPassword"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirm_password &&
                    Boolean(formik.errors.confirm_password)
                  }
                  helperText={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                  }
                />
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{
                mt: 3,
                mb: 2,
                background: "#ef9baa",
                "&:hover": {
                  cursor: "pointer",
                  color: "black",
                  backgroundColor: "white",
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              Already have an account? <NavLink to="/login">  Login</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>

    
      </Container>
      <Copyright sx={{ my: 5 }} />
    
     </Box>
  );
}
