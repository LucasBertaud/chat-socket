import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chats from './components/Chats';
import Join from './components/Join';
import Login from './components/Login';

// const socket = io.connect("https://server-chat-socket-p1w9.onrender.com/");
const socket = io.connect("http://localhost:3001");

function App() {
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [userConnected, setUserConnected] = useState(false);

  return (
    <div className="App">
        {!userConnected ? (
          <Login user={user} setUser={setUser}/>
        ) : !showChat ? (
          <Join socket={socket} showChat={showChat} setShowChat={setShowChat} user={user} setUser={setUser} room={room} setRoom={setRoom}/>
        ) : (
          <Chats socket={socket} user={user} room={room} />
        )}
    </div>
  );

}

export default App;
