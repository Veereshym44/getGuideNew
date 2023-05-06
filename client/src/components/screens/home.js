import React, { useState, useEffect } from 'react';
import UserHome from './userHome';
import GuidePage from './guidePage';
function Home() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

if(!user) 
    return (
      <div className='home-container'>
NO USER FOUND
      </div>
    );
    if(user.userType==="user") 
    return (
      <div className='home-container'>
      <UserHome/>
      </div>
    );
    if(user.userType==="guide") 
    return (
      <div className='home-container'>
<GuidePage/>
      </div>
    );
    if(user.userType==="admin") 
    return (
      <div className='home-container'>
ADMIN DASHBOARD
      </div>
    );
  }


export default Home;
