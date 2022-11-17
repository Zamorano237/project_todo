import './index.css';
import Header from "./Header"
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
import { useEffect, useState } from 'react'


function App() {
  const API_URI = '  http://localhost:3500/items'
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [search, setSearch] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const reponse = await fetch(API_URI)
        if(!reponse.ok) throw Error('I did not fetch data')
        const listItems = await reponse.json()
        setItems(listItems)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setLoading(false)
      }
    }
    setTimeout(async () => await fetchItems(), 2000)
  },[])

// let Checked = []
const addItem = async (item) => {
  const id = (items.length) ? items[items.length - 1].id +1 : 1
  const myNewItem = {
    id,
    checked : false,
    item
  }
  const listItems = [...items, myNewItem]
  setItems(listItems)
  const optionsPost = {
    method: "POST",
   headers :{
    'Content-Type' : 'application/json'
   },
   body: JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URI, optionsPost)
  if (result) setFetchError(result)
}


const handleCheck = async (id) => {
  const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
  setItems(listItems);

  const myItem = listItems.filter((item) => item.id === id);
  const updateOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ checked: myItem[0].checked })
  };
  const reqUrl = `${API_URI}/${id}`;
  const result = await apiRequest(reqUrl, updateOptions);
  if (result) setFetchError(result);
}

const handelDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)
    
    const deleteOptions = {method: 'DELETE'}
    const reqUrl = `${API_URI}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if(result) setFetchError(result)
}

const handelSubmit = (e) => {
  e.preventDefault()
  if(!newItem) return;
  addItem(newItem)
  setNewItem("")
}

// let getStorage = () =>{
//     return localStorage.getItem("shoppinglist") ? JSON.parse(localStorage.getItem("checked")) : []
// }
  return (
    <div className="App">
      <Header  title= "Grocery List"/>
      <AddItem 
      newItem = {newItem}
      setNewItem = {setNewItem}
      handelSubmit = {handelSubmit}
      />
      <SearchItem 
      search = {search}
      setSearch = {setSearch}
      />

      <main>
        {loading && <p> Data loading...</p>}
        {fetchError && <p style={{color:'red'}}>{fetchError}</p>}
        {!fetchError && !loading && <Content 
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
        handelDelete = {handelDelete} 
        handleCheck = {handleCheck} 
        />}
      </main>
      <Footer lenght = {items.length} />
    </div>
  );
}

export default App;
