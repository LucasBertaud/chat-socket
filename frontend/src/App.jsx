import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chats from './components/Chats';
import Join from './components/Join';
import Login from './components/Login';
import Home from './components/Home';
import Contact from './components/Contact';
import Edit from './components/Edit';

// const socket = io.connect("https://server-chat-socket-p1w9.onrender.com/");
const socket = io.connect("http://localhost:3001");

function App() {
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [room, setRoom] = useState("");
  const [userConnected, setUserConnected] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("home");
  
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <Home />
        break;
      case 'contact':
        return <Contact userId={userId}/>
        break;
      case 'edit':
        return <Edit user={user} userId={userId} userImage={userImage} setUserImage={setUserImage} userDescription={userDescription} setUserDescription={setUserDescription}/>
        break;
      case 'chat':
        return <Chats socket={socket} user={user} room={room} />
        break;
      default:
        break;
    }
  }

  const disconnect = () => {
    setUser("");
    setUserConnected(false)
  }

  // return (
  //   <div className="App">
  //       {!userConnected ? (
  //         <Login user={user} setUser={setUser} setUserConnected={setUserConnected}/>
  //       ) : !showChat ? (
  //         <Join socket={socket} setShowChat={setShowChat} room={room} setRoom={setRoom}/>
  //       ) : (
  //         <Chats socket={socket} user={user} room={room} />
  //       )}
  //   </div>
  // );
  return(
    <div className="container">
      <div className="row">
        <nav className="menu">
          <ul className="items">
            <li className={`item ${!userConnected || selectedComponent == "home" ? 'item-active' : ''}`} onClick={()=>{setSelectedComponent("home")}}>
              <i className="fa fa-home" aria-hidden="true"></i>
            </li>
            <li className={`item ${selectedComponent == "contact" ? 'item-active' : ''}`} onClick={()=>{setSelectedComponent("contact")}}>
              <i className="fa fa-user" aria-hidden="true"></i>
            </li>
            <li className={`item ${selectedComponent == "edit" ? 'item-active' : ''}`} onClick={()=>{setSelectedComponent("edit")}}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </li>
            <li className={`item ${selectedComponent == "chat" ? 'item-active' : ''}`} onClick={()=>{setSelectedComponent("chat")}}>
              <i className="fa fa-commenting" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-file" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-cog" aria-hidden="true"></i>
            </li>
            {userConnected ? (
              <li className="item" onClick={disconnect}>
                <i className="fa fa-power-off" aria-hidden="true"></i>
              </li>
            ) : ('')}
          </ul>
        </nav>
        {!userConnected ? (
          <Login user={user} setUser={setUser} setUserConnected={setUserConnected} setUserId={setUserId}/>
        ) : (
          renderComponent()
        )}
       
      </div>
    </div>
)
}

export default App;
