import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({item, handleCheck, handelDelete}) => {
  return (
        <li className="item" >
        <input
        onChange={() => {handleCheck(item.id)}} 
        type="checkbox" 
        checked = {item.checked} />
        <label 
        onDoubleClick={() => {handleCheck(item.id)}}
        style={(item.checked) ? { textDecoration:"line-through"} :null }>
            
            {item.item} 
        </label>
        <FaTrashAlt 
        onClick={() => handelDelete(item.id)}
        role= "button" 
        tabIndex ="0"/>
    </li>
  )
}

export default LineItem