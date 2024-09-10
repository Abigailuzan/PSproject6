import React from 'react'
import '../Stlyles/UserInfoData.css';
function UserInfoData({user}) {
  return (
    <div className="user-info-container">      
    <div >
      <label>First Name:</label>
      <p>{user.first_name}</p>
    </div>
    <div >
      <label>Last Name:</label>
      <p>{user.last_name}</p>
    </div>
    <div >
      <label>Email:</label>
      <p>{user.email}</p>
    </div>
    </div>

  )
}

export default UserInfoData