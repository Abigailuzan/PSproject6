import React from 'react'
import '../Stlyles/UserInfoData.css';
function UserInfoData({user}) {
  return (
    <div className="user-info-container">      
    <div >
      <label className="label-user">First Name:</label>
      <p>{user.first_name}</p>
    </div>
    <div >
      <label className="label-user">Last Name:</label>
      <p>{user.last_name}</p>
    </div>
    <div >
      <label className="label-user">Email:</label>
      <p>{user.email}</p>
    </div>
    </div>

  )
}

export default UserInfoData