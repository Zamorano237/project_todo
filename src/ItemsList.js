import React from 'react'
import LineItem from './LineItem';

const ItemsList = ({items, handleCheck, handelDelete}) => {
  return (
        <ul >
            {items.map(item => (
               <LineItem 
               key = {item.id}
               item = {item} 
               handelDelete = {handelDelete} 
               handleCheck = {handleCheck}
               />
            ))}
        </ul>

  )
}

export default ItemsList