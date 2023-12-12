import React, { useState } from 'react'
import Register from './Register'
import axios from 'axios'

function Login({user, setUser, setUserConnected}) {
    const [toRegister, setToRegister] = useState(false)
    const [password, setPassword] = useState("")

    function connection(){
        // axios.post("https://server-chat-socket-p1w9.onrender.com/user", {
        //     user: user,
        //     password: password
        // })
        axios.post("http://localhost:3001/user", {
            user: user.pseudo,
            password: password
        })
        .then((res)=>{
            if (res.data.pseudo) {
                setUser({pseudo: res.data.pseudo, id: res.data.user_id})
                setUserConnected(true)
            }
        })
        .catch((error)=>console.error(error))
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setToRegister(true);
        }
    };

    return (
        <>
            {!toRegister ?(
            <div className="wrapper">
                <div className="form-signin">       
                    <h2 className="form-signin-heading">Connexion</h2>
                    <input type="text" className="form-control" name="username" placeholder="Pseudo" required="" autoFocus="" onChange={(e)=>setUser({pseudo: e.target.value})} />
                    <input type="password" className="form-control" name="password" placeholder="Mot de passe" required="" onChange={(e)=>setPassword(e.target.value)} />      
                    <label className="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Se souvenir de moi
                    </label>
                    <button className="btn btn-lg btn-primary btn-block" disabled={password == "" || user == ""} type="submit" onClick={connection}>Connexion</button>
                    <p>Pas encore de compte ? <span className='span-register' tabIndex={0} onKeyUp={handleKeyPress} onClick={() => setToRegister(true)}>Inscrivez-vous</span></p>  
                </div>
            </div>
            ) : (
                <Register user={user} setUser={setUser} setToRegister={setToRegister}/>
            )}
        </>
    )
}

export default Login