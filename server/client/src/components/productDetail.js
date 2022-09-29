import { useParams } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Typography from "@mui/material/Typography";
import { Quantity } from "./Quantity";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { add ,getCartValue} from '../redux/Cartcounter';

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";



export default function ProductDetail() {
  const qunatity = useSelector((state) => state.counter.value)//getting qunatity of product
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams()
  const [product, setproduct] = useState({});
  const [img, setimg] = useState([])
  const [newimg, setnewimg] = useState('')

  const toastsuccess = () => {
    toast.success('🦄 Added to Cart  !', {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  const toastdanger = () => {
    toast.error(' already added to cart', {
      position: toast.POSITION.TOP_RIGHT

    });
  };


  async function setcart(prod) {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/cart",
        data: {
          "title": prod.title,
          "img": prod.category.image,
          "price": prod.price,
          "quantity": qunatity

        }
      })
      if (res) {
        console.log(res, "item added")
        dispatch(add())
        dispatch(getCartValue())
        toastsuccess()
      }
      else {
        toastdanger();
      }
    }
    
    catch (err) {
      console.log(err)
      toastdanger();
    }

  }

  useEffect(() => {
      axios.get(`http://localhost:5000/product/${id}`)
        .then(res => {
          setproduct(res.data)
  
          setimg(res.data.img)
        })
  }, [id]);

  return (
    <>
      <div className="container">
        <Box xs={{ flexDirection: 'row' }} sx={{ minWidth: 230, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px' }}>

          <div key={product._id} className="rounded-lg text-center flex flex-row" style={{
            textTransform: 'capitalize',
            maxWidth: '500px', padding: '17px', display: 'inline-block', marginLeft: '15px', marginTop: '20px', marginRight: '20px'
          }} >


            {newimg !== '' ?
              <img src={newimg}
              alt="product"
                height="180px"
              ></img> : <img   alt="product" src={product?.category?.image}></img>
            }
            <div className="flex flex-row h-[6rem] space-x-7 p-6 ">
              {img.map((im, id) => {
                return <img key={id} src={im} className="hover: opacity-500" onClick={() => {
                  setnewimg(im)
                }} alt="detailed "></img>

              })}
            </div>
          </div>
          <div className="m-6">

            <Typography variant="h1" sx={{ marginTop: '10px', fontSize: '35px' }}>
              {product.title}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ marginTop: '10px', color: 'gray', lineHeight: '1.5rem' }} >
              {product.description}
            </Typography>
            <Typography variant="h6" component="div" sx={{ marginTop: '5px' }}>
              Price: {product.price} $

            </Typography>
            <Typography sx={{ marginTop: '10px', color: 'grey', fontSize: '18px', marginBottom: '10px' }}>
              Category: {product?.category?.name}
              <br />
            </Typography>
            <div className="my-5"> <Quantity /></div>

            <div aria-label="add to cart">
              <button
                title="add to cart"
                onClick={() => {

                  setcart(product)

                }}
                style={{
                  border: "2px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                  color: 'black'
                }}
              >
                <AddShoppingCartIcon />
              </button>
            </div>



            <Button variant="contained" onClick={() => {
                navigate('/catalogue')
              }} style={{ marginTop: '50px', background: '#ef9baa', }}> More shopping < ShoppingBagIcon/></Button>
             
             <Button variant="contained" onClick={() => {
              navigate('/cart')
            }} style={{ marginTop: '50px', background: '#ef9baa' , marginLeft:'30px' }}> view Cart <ShoppingCartTwoToneIcon/></Button>
          </div>


        </Box>
        <Typography sx={{ color: 'gray', marginLeft: '30px', marginTop: '30px' }}><strong>Note:</strong> Actual product color may vary slightly from the image shown.
        </Typography>
      </div>

    </>
  );
}