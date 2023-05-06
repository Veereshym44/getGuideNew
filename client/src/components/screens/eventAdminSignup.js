import React,{useState} from 'react'
import{useNavigate,Link} from'react-router-dom'
import M from 'materialize-css'

export default function EventAdminSignup() {
  const navigate=useNavigate()
const [user,setUser]=useState({
  name:"",
  email:"",
  password:""

})
let name,value;
const handleInputs=(e)=>{

  name=e.target.name
  value=e.target.value
  setUser({...user,[name]:value});

}

  const PostData=async(e)=>{
    e.preventDefault();
    const{ name,email,password}=user;
    const res=await fetch("/admin-signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,password
      })
    });
  const data= await res.json();
    if(!data){
window.alert('Invalid Signup')
    }
    else if(data.error)
    {
      M.toast({html:data.error})
    }
    else{
      M.toast({html:data.message});
      navigate('/login')
    
    }

    
  }

      return (
        <div className="container-fluid ">
          <div
            className="row align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="card col-md-4 col-11 my-2 p-3 d-flex flex-column align-items-center justify-content-center">
              <form onSubmit={PostData} className="m-2 p-1 w-100">
                <h2 className="text-left m-1 mb-4">Sign up</h2>
    
                <input
                  type="text"
                  className="form-control  my-3 py-3"
                  placeholder="Enter your name"
                  name="name"
                  required
                  id="name"
                  value={user.name}
                  onChange={handleInputs}
                  style={{
                    borderRadius: "10px",
                    outline: "none",
                    backgroundColor: "#f7f7f7",
                    border: "none",
                  }}
                />
    
                <input
                  type="email"
                  className="form-control  my-3 py-3"
                  placeholder="Enter your email"
                  name="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  id="email"
                  value={user.email}
                  onChange={handleInputs}
                  style={{
                    borderRadius: "10px",
                    outline: "none",
                    backgroundColor: "#f7f7f7",
                    border: "none",
                  }}
                />
    
                <input
                  type="password"
                  className="form-control  my-3 py-3"
                  placeholder="Create your password"
                  name="password"
                  required
                  minLength={6}
                  id="password1"
                  value={user.password}
                  onChange={handleInputs}
                  style={{
                    borderRadius: "10px",
                    outline: "none",
                    backgroundColor: "#f7f7f7",
                    border: "none",
                  }}
                />
    
               
    
                <button
                  type="submit"
                  className="btn btn-dark w-100 my-2"
                  style={{ backgroundColor: "#393e46", borderRadius: "10px" }}
                >
                 SignUp
                </button>
              </form>
              <Link to={"/login"}>
                
                <small>Already have an account? Sign in</small>
              </Link>
            </div>
          </div>
        </div>
      );
    }
 
