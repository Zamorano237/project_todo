import React from 'react'
import ItemsList from './ItemsList'


const Content = ({items, handleCheck, handelDelete}) => {
    return (
    <main>
        <ItemsList 
            items = {items} 
            handelDelete = {handelDelete} 
            handleCheck = {handleCheck}
        />
        <p 
        style={(items.length === 0 ? {display : "block"} : {display : "none"})}
        >La liste des items est vide</p>
    </main>
    )
}

export default Content