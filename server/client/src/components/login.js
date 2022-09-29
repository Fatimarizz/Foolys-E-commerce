import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {user} from '../redux/counter'
import { loginschema } from "../validation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {  NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
       Fooly's
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const dispatch= useDispatch();
  const toastsuccess = () => {
    toast.success('Successfully login !', {
        position: toast.POSITION.TOP_RIGHT
    });
  };
  const toastdanger = () => {
    toast.error(' Invalid Credentials!',{
      position:toast.POSITION.TOP_RIGHT

    });
};

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    validationSchema: loginschema,
    onSubmit: values => {
    
    axios.post('http://localhost:5000/login', values,
    {
      withCredentials: true,
    })
      
      .then(result => {
          console.log('Login Successfully', result)
          dispatch(user(true))
           toastsuccess();
           setTimeout(() => window.location='/', 3000);
          


      }).catch(e=>{
        console.log(e)
     
        toastdanger()
      }
      )
  
}
    
  });

  
  return (
    <Box py={10}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          boxShadow: '8px 10px 26px 6px whitesmoke',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding:'30px'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#ef9baa"  }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 , paddingTop:'20px'  }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            autoFocus
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={formik.handleChange}
            id="password"
            autoComplete="current-password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item sx={{paddingTop:'30px'}}>
            Don't have an account? <NavLink to="/signup" > Sign Up</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
    </Box>
  );
}