import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chats from './components/Chats';

const socket = io.connect("https://server-chat-socket-p1w9.onrender.com/");

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <>
          <input 
            type="text" 
            placeholder='your pseudo' 
            onChange={(e)=>setUser(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='room' 
            onChange={(e)=>setRoom(e.target.value)} 
          />
          <button onClick={joinRoom}>Join room</button>
        </>
      ) : (
        <Chats socket={socket} user={user} room={room} />
      )}
    </div>
  );
}

export default App;
