import { createSlice } from '@reduxjs/toolkit'



export const Counter = createSlice({
  name: 'counter',
  initialState: {
    value: 1,
    toggle:false
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    user:(state,action)=>{
      console.log("action",action.payload)
     state.toggle=action.payload
    }
    
    
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement,user } = Counter.actions

export default Counter.reducer