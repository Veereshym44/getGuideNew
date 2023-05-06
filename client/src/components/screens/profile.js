import React,{useEffect,useState,useContext} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

export default function Profile() {
const Navigate=useNavigate();
const [data,setData]=useState([])
  const {state,dispatch}=useContext(UserContext);
   useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    setData(user);
    if(user)
    {
    Navigate('/profile')
    dispatch({type:"USER",payload:user})
    }
    else{
    Navigate('/login');
    }
    },[])

 



  
if(data.guideDetails.length!=0)
{
  return (
    <div className="proflie-main-div">
    <div className="card col-md-4 col-11 my-2 p-3 d-flex flex-column align-items-center justify-content-center">
    <h3 className="text-center my-3">{data.name}</h3>

    <div className="my-3">
      <p>
        <strong>Location: </strong>
        {data.guideDetails[0].city}
      </p>
      <p>
        <strong>Description: </strong>
        {data.guideDetails[0].description}
      </p>
      <p>
        <strong>Languages: </strong>
        {data.guideDetails[0].languages}
      </p>
      <p>
        <strong>Phone: </strong>
        {data.guideDetails[0].phoneNumber}
      </p>
    </div>
  </div>
    </div>
  )


}

if(data.guideDetails.length===0){
  return(
    <div className="card col-md-4 col-11 my-2 p-3 d-flex flex-column align-items-center justify-content-center">
  <h3 className="text-center my-3">{data.name}</h3>

  <div>
  No details provided
  </div>
</div> 
  )
}
}
