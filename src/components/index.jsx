import {useState, useEffect} from 'react';
import Suggestions from './suggestion';




export default function SearchAutoComplete(){

  const [loading,setLoading]=useState(false)
  const [users,setUsers]=useState([])
  const [error,setError]=useState(null)
  const [searchParam, setSearchParam]=useState('')
  const [showDropdown, setShowDropdown]=useState(false)
  const [filteredUsers, setFilteredUsers]=useState([])

  async function fetchListOfUsers(){
      try {
        setLoading(true)
        const response = await fetch('https://dummyjson.com/users')
        const data = await response.json()
        if(data && data.users && data.users.length) {
          setUsers(data.users.map((userItem)=>userItem.firstName))
          setLoading(false)
          setError(null)
        }
      } catch (error) {
        setError(error)
        setLoading(false)
      }
   }

   function handleClick(event){
    showDropdown(false)
    setSearchParam(event.target.innerText)
    setFilteredUsers([])

   }

   function handleChange(event){
      const query = event.target.value.toLowerCase()
      searchParam(query)
      if(query.length > 1){
         const filteredData = users && users.length ? 
         users.filter(item => item.toLowerCase().indexOf(query)>-1)
         :[];
         setFilteredUsers(filteredData)
         setShowDropdown(true) 
      }
      else {
        setShowDropdown(false)
      }
   }

  useEffect(()=>{
    fetchListOfUsers()
  },[])


  return <div className="search-autocomplete-container">
          {
            loading ? <h1>Loading Data ! Please wait</h1> :
            <input 
            value={searchParam}
            name="search-users"
            placeholder="Search Users here..."
            onChange={handleChange}/>
          }
        
        {
          showDropdown && <Suggestions  handleClick={handleClick} data={filteredUsers}/>
        }
  </div>

}