import React, { useState } from 'react'
import Register from './Register'
import axios from 'axios'

function Login({user, setUser, setUserConnected}) {
    const [toRegister, setToRegister] = useState(false)
    const [password, setPassword] = useState("")

    function connection(){
        axios.post("https://server-chat-socket-p1w9.onrender.com/user", {
            user: user,
            password: password
        })
        .then((res)=>{
            if (res.data.pseudo) {
                setUser(res.data.pseudo)
                setUserConnected(true)
            }
        })
        .catch((error)=>console.error(error))
    }

    return (
        <>
            {!toRegister ?(
                <>
                    <h3>Login</h3>
                    <div className='login' style={{display: 'flex', flexDirection: 'column'}}>
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
                        <button onClick={() => setToRegister(true)}>Register</button>
                        <button disabled={password == ""} onClick={connection}>Login</button>
                    </div>
                </>
            ) : (
                <Register user={user} setUser={setUser} setToRegister={setToRegister}/>
            )
            }
        </>
    )
}

export default Login