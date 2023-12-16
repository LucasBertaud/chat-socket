import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

function Register({user, setUser, setToRegister}) {
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    function registerUser() {
        if (password == passwordRepeat) {
            axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/user`, {
                pseudo: user,
                password: password
            })
            .then((response)=>{
                if (response.data.sauvegarde) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Votre compte a bien été enregistré",
                        showConfirmButton: false,
                        timer: 1500,
                        didClose: () => {
                            setToRegister(false)
                        }
                    });
                }
            })
            .catch((error)=> console.error(error))
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setToRegister(false);
        }
    };

    return(
        <div className="wrapper">
            <div className="form-signin">       
                <h2 className="form-signin-heading">Inscription</h2>
                <input type="text" className="form-control" name="username" placeholder="Pseudo" required autoFocus="" onChange={(e)=>setUser(e.target.value)} />
                <input type="password" className="form-control" name="password" placeholder="Mot de passe" required onChange={(e)=>setPassword(e.target.value)} />
                <input type="password" className="form-control" name="confirm-password" placeholder="Confirmer le mot de passe" required onChange={(e)=>setPasswordRepeat(e.target.value)} />       
                <button className="btn btn-lg btn-primary btn-block" disabled={password !== passwordRepeat || password == "" || user == ""} type="submit" onClick={registerUser}>Inscription</button>
                <p>Vous avez déjà un compte ? <span className='span-register' tabIndex={0} onKeyUp={handleKeyPress} onClick={() => setToRegister(false)}>Connectez-vous</span></p>  
            </div>
        </div>
    )
}

export default Register