import { useState} from "react";
import './styles.css';

import axios from "axios";

function Register() {
const [username, setusername] = useState("");

const [email,setEmail] = useState("");
const[password,setPassword] =useState("");
const[course,setCourse] =useState("business");

async function save(event) {
  event.preventDefault();
  try{
    await axios.post("http://localhost:8080/api/v1/user/save",{
      username:username,
      email:email,
      password:password,
      course:course,

    });
    alert("Student Registation Successfully");
  } catch (err) {
    alert(err);
  }
}
    return (
      <div class="login-container">
      <h2>Register</h2>
      <form>
      <div class="input-group">
              <label for="user name">User Name</label>
              <input type="user name" id="user name" placeholder="Enter your name" value={username}
                 onChange={(event) =>{
                  setusername(event.target.value)
                }}

                required/>
          <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" value={email}
                onChange={(event)=>{
                  setEmail(event.target.value);
                }}

                
required/>
          </div>
          <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password"   onChange={(event)=>{
                  setPassword(event.target.value);
                }}

              
                required/>
             {/* <div class="input-group">
              <label for="course">Course</label>
              <input type="course" id="course" placeholder="Enter your course" value={course}
                onChange={(event) =>{
                  setCourse(event.target.value);
                  
                }} */}
                 <label for="course">Course</label>
                <select name="course" value={course}  onChange={(event) => setCourse(event.target.value)}
 className="input">
            <option value="business">Business</option>
            <option value="caregiver">Caregiver</option>
            <option value="tourism">tourism</option>
            </select>
 
          </div>
          <button type="submit" class="login-btn"　onClick={save}>Register</button>
          </div>
        
      </form>
  </div>
  
    );
  }
  
  export default Register;
  