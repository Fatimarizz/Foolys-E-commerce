import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {Callcart} from '../api/cart';

export const getCartValue = createAsyncThunk(
  "cart/getCartValue",
  async function getcartDetail() {
    try {
      const res = await Callcart();
   console.log(res.length)
   return res.length
   
    }
      
     catch (error) {
      console.log(error, "fetch detail error");
    }
  }
);

export const Cartcounter = createSlice({
  name: 'Cartcounter',
  initialState: {
    value: 0,
    length:0
  },

  reducers: {
    add: (state) => {
      state.value += 1
    },
    remove: (state) => {
      state.value -= 1
    },
    
    
    
  },
  extraReducers: {
    [getCartValue.fulfilled]: (state,action) => {
      // console.log("actionpalyload",action.payload);
      state.length=action.payload;
      // console.log("promise pending");
    },
   
}
})

// Action creators are generated for each case reducer function
export const { add, remove,addLength } = Cartcounter.actions

export default Cartcounter.reducer