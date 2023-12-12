import React, { useEffect } from 'react'
import axios from 'axios';

function Description({user, setUser}) {
    // Modifier une description
    console.log(user)
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            axios.patch('http://localhost:3001/user', {description: user.description, id: user.id})
            .catch((error)=>console.error(error))
        }, 2000);
    
        return () => {
            clearTimeout(timeoutId)
        }
    }, [user.description])

  return (
    <textarea type="text" name="" className='desc' rows={5} maxLength={80} id="" placeholder={user.description && user.description != "" ? (""):("Écrivez une description")} value={user.description} style={{border: "none"}} 
          onKeyDown={(e)=>{
            if (e.key == "Enter") {
              e.preventDefault();
            }
          }} 
          onChange={(e)=>{
            setUser(prev => ({...prev, description: e.target.value}))
          }} />
  )
}

export default Description