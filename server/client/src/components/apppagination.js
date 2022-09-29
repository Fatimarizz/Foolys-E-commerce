import React from "react";
import Pagination from "@mui/material/Pagination";


const AppPagination = ({ setPagination ,pagination }) => {
  

  const handlePageChange = (event, page) => {
    const offset = (page - 1) * 6;
    setPagination({ ...pagination, offset });
  };

  return (
    <Pagination count={6} variant="outlined" color="secondary"  shape="rounded" onChange={handlePageChange}

   
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
     
      
    />
  );
};

export default AppPagination;