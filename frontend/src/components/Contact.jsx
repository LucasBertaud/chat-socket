import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Contact({user, setUser}) {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [contactList, setContactList] = useState([])
  const ref = useRef(false)
  
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
    if (!ref.current) {
      ref.current = true
      if (user.contact != undefined) {
        axios.post("http://localhost:3001/user/getcontact", {user: user})
        .then((res)=>setContactList(res.data.listContact))
        .catch((err)=>console.error(err))
      }
      return
    }else{
      if (user.contact != undefined && user.contact.length > 0) {
        axios.put("http://localhost:3001/user/addcontact", {user: user, contact: user.contact[user.contact.length - 1]})
        .then(()=>{ref.current = false})
        .catch((err)=>console.error(err))
      }
      return
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
        { users.length > 0 ? (
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
         ) : contactList.length > 0 ? (
          contactList.map(e => {
            return(
              <div className="discussion" key={e._id}>
                <div className="photo" style={{backgroundImage: `url(http://localhost:3001/images/users/${e.image})`}}>
                    {/* <div className="online"></div> */}
                </div>
                <div className="desc-contact">
                    <p className="name">{e.pseudo}</p>
                    <p className="message">{e.description}</p>
                </div>
                <div className="timer">Contact</div>
              </div>
            )
          })
         ) : ("")
        }
    </section>
  )
}

export default Contact