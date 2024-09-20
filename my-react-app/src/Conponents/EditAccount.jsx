import React, { useEffect, useState } from 'react';
import '../Styles/Form.css';
import useLocalStorage from "../UseHooks/useLocalStorage";

function EditAccount({ OnSubmit,OnSubmitAdmin, user }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const storage = useLocalStorage();


    // עדכון השדות בכל פעם שה-user משתנה
    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
        }
    }, [user]);

    async function handleSubmit(event) {
        event.preventDefault();
        if (email.includes('staff'))
        {
            const adminData = {
                admin_id:user.admin_id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                active: 1,
                username: user.username,
                password: user.password,
                last_update: new Date().toISOString().split('T')[0],
                verification_email: storage.value.email
            }
            OnSubmitAdmin(adminData);
        }
        else{
            const userData = {
                customer_id:user.customer_id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                active: 1,
                create_date: user.create_date,
                last_update: new Date().toISOString().split('T')[0],
                password: user.password
            };
            OnSubmit(userData);
        }
    }


    return (
        <div className="form-container-new">
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        readOnly
                    />
                </div>
                <button type="submit" className="submit-button">Update</button>
            </form>
        </div>
    );
}

export default EditAccount;
