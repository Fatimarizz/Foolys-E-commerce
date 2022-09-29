import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Callcart } from "../api/cart";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { DeleteCart } from "../api/cart";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { remove , getCartValue} from '../redux/Cartcounter';
import { Button } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';



export default function Cart() {

  const [cart, setcart] = useState([]);
  const [price, setprice] = useState(0);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const showToastMessage = () => {
    toast.success('🦄 Deleted from Cart  !', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  useEffect(() => {
    let sum = 0;
    async function getcartDetail() {
  
      const res = await Callcart()
      console.log(res, "response");
      if (res) {
        
        setcart(res);
        res.map((obj) => {
          return sum += obj.price * obj.quantity;

        })
        setprice(sum)
        console.log("response", res)
      }
      else
        navigate("/login")

    }
    dispatch(getCartValue())
    getcartDetail();
   
  }, [dispatch,navigate])

  return (
    <>
      <div className="container h-[50rem] p-3">
        <Box component="div">
          <h1 className="text-center text-4xl font-mono mt-[30px]"> Your Cart</h1>
        </Box>
        <Grid container spacing={3} sx={{ marginTop: '20px' }} alignItems="center" justifyContent="center">

          {cart?.length > 0 ? (
            <div>
              {cart.map((c) => {
                return <div key={c._id} className="rounded-lg text-center  " style={{
                  textTransform: 'capitalize', backgroundColor: 'rgb(255, 255, 255)', color: 'rgba(0, 0, 0, 0.87)', transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', borderRadius: '11px'
                  , boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
                  overflow: 'hidden',
                  maxWidth: '500px', padding: '17px', display: 'inline-block', marginLeft: '15px', marginTop: '20px', marginRight: '20px'
                }}

                >
                  <div>
                    <img src={c?.img} alt="product" className="h-[180px] rounded-lg" />
                  </div>

                  <Typography variant="h5" component="div">
                    {c.title}
                    <br />
                  </Typography>
                  <Typography variant="h6" component="div">
                    Price: {c?.price * c?.quantity} $
                  </Typography>
                  <Typography variant="h6" component="div">
                    Quantity: {c?.quantity}
                  </Typography>

                  <div aria-label="Delete from cart">
                    <button
                      title="Delete to cart"

                      onClick={() => {
                        dispatch(remove())
                        dispatch(getCartValue())
                        DeleteCart(c._id);
                        showToastMessage();

                      }}
                      style={{
                        border: "2px solid black",
                        borderRadius: "10px",
                        padding: "10px",
                        color: 'black'
                      }}
                    >
                      <RemoveShoppingCartIcon />
                    </button>
                  </div>


                </div>


              })}




              <Typography sx={{ marginTop: '50px', marginLeft: "30px" }} variant="h6" component="div">
                Total Price : {price}
              </Typography>
              <Button variant="contained" onClick={() => {
                navigate('/catalogue')
              }} style={{ marginTop: '50px', background: '#ef9baa', marginLeft: '99px' }}> More shopping < ShoppingBagIcon /></Button>
            </div>

          )
            :
            (<div className="mt-5  text-gray-500 font-mono font-semibold text-4xl">
              <h1 className="ml-[9.5rem]">Empty! </h1>
              <img alt="cart" src="../images/cartfinal.gif" className="h-[360px]"></img>
              <Button variant="contained" onClick={() => {
                navigate('/catalogue')
              }} style={{ marginTop: '25px', marginLeft: '99px' }}> <ShoppingBagIcon /></Button>
            </div>
            )
          }


        </Grid>
      </div>
    </>
  );
}