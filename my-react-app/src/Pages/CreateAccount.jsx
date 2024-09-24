import React from 'react'
import NewAccount from '../Conponents/NewAccount'
import NavbarLeft from '../Conponents/NavbarLeft'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../UseHooks/useLocalStorage";

function CreateAccount() {
    const navigate = useNavigate();
    const storage = useLocalStorage();
    async function onSubmit(customer,setError){
        await axios.post('http://localhost:5000/customers',customer)
            .then(response => {
                const addedCustomer = response.data;
                storage.set({id: addedCustomer.customer_id ,email:addedCustomer.email,userName:addedCustomer.first_name,userLastName:addedCustomer.last_name});
                navigate("/home");
            })
            .catch(error => {
                if (error.response) {
                    setError(error.response.data.error);
                } else {
                    setError('There was an error creating your account. Please try again.');
                }
                console.error('Error:', error);
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