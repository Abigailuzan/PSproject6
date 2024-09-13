import React from 'react'
import NewAccount from '../Conponents/NewAccount'
import NavbarLeft from '../Conponents/NavbarLeft'
import axios from "axios";

function CreateAccount() {
    function onSubmit(customer){
        axios.post('http://localhost:5000/customers',customer)
            .then(response => {
                console.log('customer added')
                const addedMovie = response.data;
                console.log(addedMovie)
                //alert('customer added successfully');
            })
            .catch(error => {
                console.error('There was an error fetching the message!', error);
            });
    }
  return (
    <div>
      <div>
      <NavbarLeft/>
      <h1> Create a movieWatch Account</h1>
      </div>
    <NewAccount onSubmit={onSubmit}/>
    </div>
  )
}

export default CreateAccount