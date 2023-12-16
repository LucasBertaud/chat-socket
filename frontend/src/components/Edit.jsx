import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import Description from './Description';
const BASE_URL = "https://server-chat-socket-p1w9.onrender.com"


function Edit({user, setUser}) {
  // Modifier une image
  const modalImg = async () => {
    const { value: file } = await Swal.fire({
        title: "Choisir une image",
        input: "file",
        inputAttributes: {
          "accept": "image/*",
          "aria-label": "Upload your profile picture"
        }
      });
      if (file) {
        let formData = new FormData();
        formData.append('image', file)
        formData.append('id', user.id)
        axios.patch(`${BASE_URL}/user`, formData, { 
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then((res) => {
          setUser(prev => ({...prev, image: res.data.update}))
        })
        .catch((error)=>console.error(error))
        const reader = new FileReader();
        reader.onload = (e) => {
          Swal.fire({
            title: "Votre image téléchargée",
            imageUrl: e.target.result,
            imageAlt: "L'image téléchargée"
          });
        };
        reader.readAsDataURL(file);
      }
  }
    
  return (
    <div className="cards-container">
        <div className="card card-one">
        <header>
        <div className="avatar" onClick={modalImg}>
          {user.image != undefined ?(<img src={`${BASE_URL}/images/users/${user.image}`} alt={user} />):("")}
        </div>
        </header>

        <h3>{user.pseudo}</h3>
        <div className="desc">
          <Description user={user} setUser={setUser}/>
        </div>

        <footer>

        </footer>
    </div>
  </div>
  )
}

export default Edit