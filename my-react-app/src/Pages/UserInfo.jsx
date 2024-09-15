import React, {useState} from 'react';
import Navbar from '../Conponents/Navbar';
import UserInfoData from '../Conponents/UserInfoData';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../UseHooks/useLocalStorage';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
function UserInfo() {
    const storage = useLocalStorage("currentUser"); // גישה ל-localStorage עם המפתח הנכון
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [localError, setLocalError] = useState(null);

    const userData = storage.value || { userName: '', email: '' };
    function OnDelete(){
        const userConfirmed = window.confirm('Are you sure you want to delete your account?');
        if(userConfirmed){
            if(storage.value.email.includes('staff'))
            {
                axios.delete(`http://localhost:5000/admins/${storage.value.id}`)
                    .then(response => {
                        console.log("response data with ok: ", response.data);
                        alert('admin deleted successfully.');
                        storage.remove();
                        navigate('/home');
                    })
                    .catch(error => {
                        // Handle error and display error message from server
                        if (error.response && error.response.data && error.response.data.error) {
                            setError(error.response.data.error);
                        } else {
                            setError('An unknown error occurred');
                        }                    });
            }
            else{
                axios.delete(`http://localhost:5000/customers/${storage.value.id}`)
                    .then(response => {
                        console.log("response data with ok: ", response.data);
                        alert('Customer deleted successfully.');
                        storage.remove();
                        navigate('/home');
                    })
                    .catch(error => {
                        console.error('There was an error delete the customer!', error);
                    });
            }
        }
    }
    return (
        <div>
            <Navbar/>
            <h1>User Information</h1>
            <UserInfoData user={userData}/>
            {(error || localError) && <p className="error-message">{error || localError}</p>}
            <button onClick={() => {
                navigate('/user-info/edit')
            }}>
                <ModeEditIcon/>
            </button>
            <button onClick={() => {
                OnDelete();
            }}>
                <DeleteIcon/>
            </button>
        </div>
    );
}

export default UserInfo;
