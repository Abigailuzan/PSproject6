import React from 'react'
import Navbar from '../Conponents/Navbar'
import AddAdminForm from '../Conponents/AddAdminForm'
function AddAdmin() {
  function onSubmit(admin){

}
  return (
    <div> 
       <Navbar/>
      <h1>Add Admin</h1>
      <AddAdminForm onSubmit={onSubmit}/>
      </div>
  )
}

export default AddAdmin