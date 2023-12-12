import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Contact({user, setUser}) {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  console.log(user)
  
  useEffect(() => {
    if (search != "") {
      axios.post("http://localhost:3001/user/searchusers", {search: search, user: user})
      .then((res)=>{
        setUsers(res.data.users)
      })
      .catch((err)=>console.error(err))
    }else{
      setUsers([])
    }
  }, [search, user])

  useEffect(()=>{
    if (user.contact != undefined) {
      axios.put("http://localhost:3001/user/addcontact", {user: user, contact: user.contact[user.contact.length - 1]})
    }
  }, [user.contact])
  

  return (
    <section className="discussions">
        <div className="discussion search">
        <div className="searchbar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}></input>
        </div>
        </div>
        {
          users.map(e => {
            return(
              <div className="discussion" key={e._id}>
                <div className="photo" style={{backgroundImage: `url(http://localhost:3001/images/users/${e.image})`}}>
                    {/* <div className="online"></div> */}
                </div>
                <div className="desc-contact">
                    <p className="name">{e.pseudo}</p>
                    <p className="message">{e.description}</p>
                </div>
                <div className="add" onClick={()=>setUser(prev => ({
                    ...prev, 
                    contact: Array.isArray(prev.contact) ? [...prev.contact, e] : [e]
                  })
                )}>Ajouter</div>
              </div>
            )
          })
        }
    </section>
  )
}

export default Contact