import React from 'react'
import Navbar from '../Conponents/Navbar'
import UserInfoData from '../Conponents/UserInfoData'
function UserInfo() {
  const userData = {
    first_name: "firstName",
    last_name: "lastName",
    email: "email",
  };
  return (
    <div>
       <Navbar/>
      <h1>User Information</h1>
      <UserInfoData user={userData }/>
    </div>
  )
}

export default UserInfo