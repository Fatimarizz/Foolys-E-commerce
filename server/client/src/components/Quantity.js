import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/counter';


export function Quantity() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();


  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => {
        
            dispatch(increment())
           
          }
        }

        >
          <AddCircleIcon/>
        </button>
        <span>{count}</span>
        
        <button
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement())
      }}          
              disabled={count === 1 ? "disabled" : ""}
        >
        <RemoveCircleIcon/>
        </button>
      </div>
    </div>
  )
}