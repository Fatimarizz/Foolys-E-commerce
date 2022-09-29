import axios from "axios";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

export function DeleteCart(id) {
  axios.delete(`http://localhost:5000/cart/${id}`)
    .then(res => {
      console.log(res);
      window.location = '/cart';
    })
}
// authentication function for cart
export const Callcart = async () => {
  // console.log(navigate)
  try {
    const token = Cookies.get('jwtoken')
    //   console.log("token", token)

    const res = await axios.get('http://localhost:5000/cart', {
      headers: { 'Authorization': `token ${token}` }
    },
      {
        withCredentials: true,
      })
    console.log("res", res);
    return res.data;

  }
  catch (err) {
    console.log("err in autherzation", err.response);
    if (err.response.status === 500) {
      console.log("no token so logout");
      return false;
    }


  }
}