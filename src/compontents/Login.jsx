import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Login() {

    const [email,setEmail] = useState("");
    const[password,setPassword] =useState("");
    const navigate= useNavigate();
    
    async function login(event) {
      event.preventDefault();
      try{
        const res = await axios.post("http://localhost:8080/api/v1/user/login",{
          email:email,
          password:password,
        });
      
    
        console.log(res.data);
        if(res.data.message === "Email does not exits"){
            alert("Email does not exits");
        }
        else if(res.data.message ==="Login Success"){
          const userCourse = res.data.course; // Assuming the API response includes the course
          localStorage.setItem("userCourse", userCourse); 
    console.log(userCourse);
          if (userCourse === "tourism") {
              navigate('/tourism');
          } else if (userCourse === "business") {
              navigate('/business');
          } else if (userCourse === "caregiver") {
              navigate('/caregiver');
          } else {
              navigate('/home'); // Default page if course is unknown
          }
        }
        else
        {
            alert("Incorrect Email and Password not match");
        }
        
        // , fail =>{
        //     console.error(fail);//Error!
        // });
        }catch (error) {
          console.error("An error occurred:", error);
          alert("An unexpected error occurred. Please try again later.");
      }
  }
    return ( 
      <div class="login-container">
      <h2>Login</h2>
      <form onSubmit={login}>
          <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" value={email}
                onChange={(event) =>{
                  setEmail(event.target.value);
                }}
required/>
          </div>
          <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" onChange={(event)=>{
                  setPassword(event.target.value);
                }}
 required/>
          </div>
          <button type="submit" class="login-btn">Login</button>
      </form>
  </div>
    );
  }
    
    export default Login;
    