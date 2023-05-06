
import React,{useState,useContext} from 'react'
import{useNavigate,Link}from 'react-router-dom'
import{UserContext}from '../../App'

import M from 'materialize-css'



export default function Login() {
  const {state,dispatch}=useContext(UserContext)
  const [user,setUser]=useState({
  
    email:"",
    password:""
  })
  const Navigate=useNavigate();
  let name,value;
const handleChange=(e)=>{

  name=e.target.name
  value=e.target.value
  setUser({...user,[name]:value});

} 
const PostData=async(e)=>{
  e.preventDefault()
  const{ email,password}=user;
  const res=await fetch("/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,email,password
    })
  }).then(res=>res.json())
  .then(data=>{
    console.log(data)
    if(data.error){
      M.toast({html:data.error})
      console.log(data.error);
    }
    else{
      M.toast({html:data.message})
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      if(data.user.userType==="user")
      {
      dispatch({type:"USER",payload:data.user});
    
      
      }
      if(data.user.userType==="guide")
      {
        dispatch({ type: "GUIDE", payload: data.user });
      }
      
      if(data.user.userType==="admin")
      {
        dispatch({ type: "ADMIN", payload: data.user });
      }
      Navigate('/')
    }
  })

}
  
    
    return (
      <div className="container-fluid">
        <div
          className="row align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="card col-md-4 col-11 my-2 p-3 d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={PostData} className="m-2 p-1 w-100">
              <h2 className="text-left m-1 mb-4">Sign in</h2>
  
              <input
                type="email"
                className="form-control my-3 py-3"
                placeholder="Enter your email"
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                id="email"
                value={user.email}
                onChange={handleChange}
                style={{
                  borderRadius: "10px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                  border: "none",
                }}
              />
  
              <input
                type="password"
                className="form-control my-3 py-3"
                placeholder="Enter your password"
                name="password"
                required
                minLength={6}
                id="password"
                style={{
                  borderRadius: "10px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                  border: "none",
                }}
                value={user.password}
                onChange={handleChange}
              />
  
              <button
                type="submit"
                className="btn btn-dark w-100 my-2"
                style={{ backgroundColor: "#393e46", borderRadius: "10px" }}
              >
                Login
              </button>
            </form>
            <Link to={"/signup"}>
              {" "}
              <small>Don't have an account? Sign up</small>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  
}
