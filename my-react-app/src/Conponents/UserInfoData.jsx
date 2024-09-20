import React from 'react'
import '../Styles/UserInfoData.css';
function UserInfoData({user}) {
  return (
      <div className="user-info-container">
        <div>
          <label className="label-user">first name:</label>
          <p>{user.userName}</p>
        </div>
        <div>
          <label className="label-user">last name:</label>
          <p>{user.userLastName}</p>
        </div>
        <div>
          <label className="label-user">Email:</label>
          <p>{user.email}</p>
        </div>
      </div>

  )
}

export default UserInfoData