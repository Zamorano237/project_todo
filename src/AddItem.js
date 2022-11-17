import React from 'react'
import { useRef } from 'react';
import { FaPlus } from "react-icons/fa";

const AddItem = ({newItem, setNewItem, handelSubmit}) => {
    const inputRef = useRef()
    return (
        <form className='addForm' onSubmit={handelSubmit}>
        <label htmlFor="addItem">  
            Add Item
        </label>
        <input type="text"
        ref={inputRef}
          autoFocus id='addItem' 
          placeholder='Add Item'
          value = {newItem}
          onChange = {(e) => setNewItem(e.target.value)}
          />

        <button
        onClick={() => inputRef.current.focus()}
         type="submit" 
         aria-label='Add Item'>
        <FaPlus/>
        </button>
    </form>
    )
}

export default AddItem