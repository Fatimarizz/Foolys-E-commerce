import * as React from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getproduct } from "../api/productapi";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { Box } from "@mui/material";
import AppPagination from "./apppagination";

export default function Catalogue() {
  const navigate = useNavigate();
  const [product, setproduct] = useState([])

  const [pagination, setPagination] = useState({ offset: 0, limit: 6 });

  useEffect(() => {
    const _setProducts = async () => {
      const products = await getproduct(pagination.offset, pagination.limit);
      setproduct(products);
      console.log('products', products);
    };
    _setProducts();
  }, [pagination, setproduct]);
  console.log(product);


  return (
    <>
      <div  >
        <div className="flex align-middle" >

          <Box sx={{ minWidth: 230 }} >
            <h1 className="text-center text-4xl font-mono mt-[30px]"> Our Catalogue</h1>
            <CardContent sx={{ margin: '2px', }}>

              {product?.length > 0 ?
                <div>
                  {product?.map((prod) => {
                    return <div key={prod._id} className="rounded-lg text-center" style={{
                      textTransform: 'capitalize', backgroundColor: 'rgb(255, 255, 255)', color: 'rgba(0, 0, 0, 0.87)', transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', borderRadius: '11px'
                      , boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
                      overflow: 'hidden',
                      maxWidth: '500px', padding: '17px', display: 'inline-block', marginLeft: '15px', marginTop: '20px', marginRight: '20px'
                    }} >

                      <Link to={`/product/${prod._id}`}>
                        <div>
                          <img src={prod.category.image} alt="product" className="h-[280px] rounded-lg" />
                        </div>
                      </Link>
                      <Typography variant="h5" sx={{ marginTop: '5px' }}>
                        {prod.title}
                        <br />
                      </Typography>

                      <Typography variant="h6" component="div">
                        {prod.price} $
                      </Typography>
                      <div aria-label="Preview Product ">
                        <button
                          className="hover"
                          title="Product Detail"
                          style={{
                            border: "2px solid black",
                            borderRadius: "10px",
                            padding: "10px",
                            color: 'black'

                          }}
                          onClick={() => {
                            navigate(`/product/${prod._id}`)

                          }
                          }
                        >
                          <VisibilityIcon />
                        </button>
                      </div>

                      {/* <div aria-label="add to cart">
                      <button
                        title="add to cart"
                      
                        onClick={() => {
                          setcart(prod);
                          showToastMessage();
                        
                        }}
                        style={{
                          border: "2px solid black",
                          borderRadius: "10px",
                          padding: "10px",
                          color:'black'
                        }}
                      >
                        <AddShoppingCartIcon  />
                      </button>
                    </div> */}

                    </div>

                  })}
                  
                  <div className="m-5 mb-[50px]">
                    <AppPagination setproduct={setproduct} setPagination={setPagination} pagination={pagination} />
                  </div>
                </div>


                : <Loader />
              }

            </CardContent>

          </Box>
        </div>

      </div>

    </>
  );
}