import React from 'react'
import axios from 'axios'

function Contact({userId}) {

  return (
    <section className="discussions">
        <div className="discussion search">
        <div className="searchbar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="Search..."></input>
        </div>
        </div>
        <div className="discussion message-active">
        <div className="photo" style={{backgroundImage: "url(image)"}}>
            {/* <div className="online"></div> */}
        </div>
        <div className="desc-contact">
            <p className="name">NOM</p>
            <p className="message">Mini description</p>
        </div>
        </div>
    </section>
  )
}

export default Contact