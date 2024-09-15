import Navbar from '../Conponents/Navbar'
import EditAccount from "../Conponents/EditAccount";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useLocalStorage from '../UseHooks/useLocalStorage'

function InfoEdit() {
    const storage = useLocalStorage();
    const navigate = useNavigate();
    const [customer,setCustomer] = useState({first_name:'',last_name:'',email:''})
    useEffect( () => {
        if(storage.value.email.includes('staff'))
        {
            axios.get(`http://localhost:5000/admins/${storage.value.id}`)
                .then(response => {
                    console.log("response data get : ", response.data); // הדפס את התגובה
                    setCustomer(response.data)
                })
                .catch(error => {
                    console.error('There was an error fetching the admin!', error);
                });
        }
        else{
            axios.get(`http://localhost:5000/customers/${storage.value.id}`)
                .then(response => {
                    console.log("response data get : ", response.data); // הדפס את התגובה
                    setCustomer(response.data)
                })
                .catch(error => {
                    console.error('There was an error fetching the customer!', error);
                });
        }
    }, []);

    async function OnSubmit(userData){
        axios.put(`http://localhost:5000/customers/${storage.value.id}`, userData)
            .then(response => {
                console.log("response data with ok: ", response.data); // הדפס את התגובה
                setCustomer(response.data);
                storage.remove()
                storage.set({id: userData.customer_id ,email:userData.email,userName:userData.first_name,userLastName:userData.last_name});
                navigate('/user-info');
            })
            .catch(error => {
                console.error('There was an error updating the customer!', error);
            });
    }

    async function OnSubmitAdmin(userDataAdmin){
        axios.put(`http://localhost:5000/admins/${storage.value.id}`, userDataAdmin)
            .then(response => {
                console.log("response data with ok: ", response.data); // הדפס את התגובה
                setCustomer(response.data);
                storage.remove()
                storage.set({id: userDataAdmin.admin_id ,email:userDataAdmin.email,userName:userDataAdmin.first_name,userLastName:userDataAdmin.last_name});
                navigate('/user-info');
            })
            .catch(error => {
                console.error('There was an error updating the admin!', error);
            });
    }

    return (
        <div>
            <Navbar/>
            <h1>EDIT PROFILE</h1>
            <EditAccount OnSubmit={OnSubmit} OnSubmitAdmin={OnSubmitAdmin} user={customer} />
        </div>
    );
}

export default InfoEdit;