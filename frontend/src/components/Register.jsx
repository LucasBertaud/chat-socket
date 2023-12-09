import React from 'react'
import { useState } from 'react'
import axios from 'axios';

function Register({user, setUser, setToRegister}) {
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    function registerUser() {
        if (password == passwordRepeat) {
            axios.put("http://localhost:3001/register", {
                pseudo: user,
                password: password
            })
            .then((response)=>{
                if (response.data.sauvegarde) {
                    
                }
            })
            .catch((error)=> console.error(error))
        }
    }

  return (
    <>
        <h3>Register</h3>
        <div className='register' style={{display: 'flex', flexDirection: 'column'}}>
            <input 
                type="text" 
                placeholder='your pseudo' 
                onChange={(e)=>setUser(e.target.value)}
            />
            <input 
                type="password" 
                placeholder='password' 
                onChange={(e)=>setPassword(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder='confirm password' 
                onChange={(e)=>setPasswordRepeat(e.target.value)} 
            />
            <button onClick={()=>{setToRegister(false)}}>To Login Page</button>
            <button disabled={password !== passwordRepeat} onClick={registerUser}>Register</button>
        </div>
    </>
  )
}

export default Register