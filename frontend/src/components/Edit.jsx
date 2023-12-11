import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
;

function Edit({user, userId, userImage, setUserImage, userDescription, setUserDescription}) {
    
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
            setUserImage(file.name)
            let formData = new FormData();
            formData.append('image', file)
            axios.patch('http://localhost:3001/user', formData, { 
                headers: {'Content-Type': 'multipart/form-data'},
                params: {id: userId}
            })
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
    
        console.log("changeImg")
    }
    
  return (
    <div className="cards-container">
        <div className="card card-one">
        <header>
        <div className="avatar" onClick={modalImg}>
            <img src={`images/users/${userImage}`} alt={user} />
        </div>
        </header>

        <h3>{user}</h3>
        <div className="desc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
        </div>

        <footer>

        </footer>
    </div>
  </div>
  )
}

export default Edit