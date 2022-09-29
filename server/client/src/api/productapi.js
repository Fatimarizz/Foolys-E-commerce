import axios from "axios";


  export async function getproduct(offset,limit) {
   try{
    const result =await axios.get('http://localhost:5000/product', {
        headers: { 'limit': limit,
        'currentpage' : offset
     }
      },
        {
          withCredentials: true,
        })
      
        console.log('result',result);
        return result.data
   }
   catch (err) {
    console.log(err);
   

  }
}
