import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import GetContact from './GetContact'
const BASE_URL = "https://server-chat-socket-p1w9.onrender.com"

function Contact({user, setUser, selectedComponent}) {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [contactList, setContactList] = useState([])
  const [contact, setContact] = useState("")
  const [selectContact, setSelectContact] = useState("")
  const ref = useRef(false)
  
  useEffect(() => {
    if (ref.current) {
      if (search != "") {
        axios.post(`${BASE_URL}/user/searchusers`, {search: search, user: user})
        .then((res)=>{
          setUsers(res.data.users)
        })
        .catch((err)=>console.error(err))
      }else{
        setUsers([])
      }
    }else{
      ref.current = true
    }
  }, [search, user])



  useEffect(() => {
    if (contact) {
      axios.put(`${BASE_URL}/user/addcontact`, {user: user, contact: contact})
      .then((res)=>{
        setContactList(prev => [...prev, contact])
        setUser(prev => ({...prev, contact: Array.isArray(prev.contact) ? [contact._id, ...prev.contact] : contact._id}))
      })
      .catch((err)=>console.error(err))
    }
  }, [contact])
    
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
                <div className="add" onClick={()=>setContact(e)}>Ajouter</div>
              </div>
            )
          })
         ) : (
          <GetContact user={user} contactList={contactList} setContactList={setContactList} selectedComponent={selectedComponent} setSelectContact={setSelectContact}/>
         ) 
        }
    </section>
  )

}

export default Contact