import React from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
export default function Loader() {
    return (
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" mt={5}>
        <CircularProgress style={{ margin: "auto" }} color="info" />
      </Stack>
    );
  }